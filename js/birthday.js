/* ==========================================
   YOUTH PARLIAMENT OF GHANA
   AUTOMATIC BIRTHDAY CARD SYSTEM
========================================== */

(function () {
    "use strict";

    const SECTION_ID = "ypg-birthday-section";
    const GRID_ID = "ypg-birthday-grid";

    // Ghana uses GMT / UTC+00:00.
    function getGhanaDate() {
        const parts = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Africa/Accra",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).formatToParts(new Date());

        const values = {};

        parts.forEach(function (part) {
            values[part.type] = part.value;
        });

        return {
            year: Number(values.year),
            month: Number(values.month),
            day: Number(values.day)
        };
    }

    function normaliseBirthday(value) {
        if (typeof value !== "string") {
            return null;
        }

        // Accept YYYY-MM-DD or MM-DD.
        let match = value.match(
            /^(?:(\d{4})-)?(\d{2})-(\d{2})$/
        );

        if (!match) {
            return null;
        }

        const year = match[1] ? Number(match[1]) : null;
        const month = Number(match[2]);
        const day = Number(match[3]);

        if (month < 1 || month > 12 || day < 1 || day > 31) {
            return null;
        }

        // Validate real dates when a birth year is supplied.
        if (year !== null) {
            const date = new Date(Date.UTC(year, month - 1, day));

            if (
                date.getUTCFullYear() !== year ||
                date.getUTCMonth() !== month - 1 ||
                date.getUTCDate() !== day
            ) {
                return null;
            }
        } else {
            const date = new Date(Date.UTC(2000, month - 1, day));

            if (
                date.getUTCMonth() !== month - 1 ||
                date.getUTCDate() !== day
            ) {
                return null;
            }
        }

        return { month, day };
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
    }
function getMemberName(member) {
    return member.name || "Honourable Member";
}

function getMemberPosition(member) {
    return member.position ||
        "Member, Youth Parliament of Ghana";
}

function getMemberPhoto(member) {
    return member.image || "";
}

function isBirthdayToday(member, today) {
    if (!member.birthday) return false;

    const match = /^(\d{2})-(\d{2})$/.exec(member.birthday);
    if (!match) return false;

    const month = Number(match[1]);
    const day = Number(match[2]);

    return month === today.month && day === today.day;
}

    function createBirthdayCard(member) {
        const name = getMemberName(member);
        const position = getMemberPosition(member);
        const photo = getMemberPhoto(member);

        const card = document.createElement("article");

        card.className = "ypg-birthday-card";

        const logo = document.createElement("img");
        logo.className = "ypg-birthday-logo";
        logo.src = "/images/YPG-LOGO.png";
        logo.alt = "Youth Parliament of Ghana logo";
        logo.loading = "lazy";

        const confetti = document.createElement("div");
        confetti.className = "ypg-birthday-confetti";
        confetti.textContent = "🎉 🎂 🎉";

        const label = document.createElement("div");
        label.className = "ypg-birthday-label";
        label.textContent = "Youth Parliament of Ghana";

        const title = document.createElement("h3");
        title.className = "ypg-birthday-title";
        title.textContent = "Happy Birthday, Honourable!";

        card.append(logo, confetti, label, title);

        if (photo) {
            const portrait = document.createElement("img");
            portrait.className = "ypg-birthday-photo";
            portrait.src = photo;
            portrait.alt = "Photograph of " + name;
            portrait.loading = "lazy";

            portrait.addEventListener("error", function () {
                portrait.remove();
            });

            card.appendChild(portrait);
        }

        const memberName = document.createElement("div");
        memberName.className = "ypg-birthday-name";
        memberName.textContent = name;

        const memberPosition = document.createElement("div");
        memberPosition.className = "ypg-birthday-position";
        memberPosition.textContent = position;

       const message = document.createElement("p");
message.className = "ypg-birthday-message";
message.textContent =
    "Youth Parliament Ghana warmly celebrates you " +
    "on your birthday. May the year ahead bring you " +
    "wisdom, good health, greater achievements, and " +
    "continued success in your service to young people " +
    "and our nation.";

       const signature = document.createElement("div");
signature.className = "ypg-birthday-signature";
signature.textContent =
    "The Leadership and Membership";

const signatureOrganisation = document.createElement("div");
signatureOrganisation.className = "ypg-birthday-signature-org";
signatureOrganisation.textContent =
    "YOUTH PARLIAMENT GHANA";

     card.append(
    memberName,
    memberPosition,
    message,
    signature,
    signatureOrganisation
);

        return card;
    }

    /*
     * IMPORTANT:
     * Connect the existing MP and appointee arrays here.
     * Do not create replacement member databases.
     */
  function getAllMembers() {
    const collections = [
        window.mpData,
        window.appointeeData
    ];

    const members = [];
    const seen = new Set();

    collections.forEach(function (collection) {
        if (!Array.isArray(collection)) return;

        collection.forEach(function (member) {
            if (!member || !member.id || seen.has(member.id)) {
                return;
            }

            seen.add(member.id);
            members.push(member);
        });
    });

    return members;
}

    function renderBirthdayCards() {
        const section = document.getElementById(SECTION_ID);
        const grid = document.getElementById(GRID_ID);

        if (!section || !grid) {
            return;
        }

        const today = getGhanaDate();
        const members = getAllMembers();

        const birthdays = members.filter(function (member) {
            return isBirthdayToday(member, today);
        });

        grid.replaceChildren();

        if (birthdays.length === 0) {
            section.hidden = true;
            return;
        }

        birthdays.forEach(function (member) {
            grid.appendChild(createBirthdayCard(member));
        });

        section.hidden = false;
    }

    function startBirthdaySystem() {
        renderBirthdayCards();

        // Check again at regular intervals so the section
        // updates even if the page remains open overnight.
        window.setInterval(renderBirthdayCards, 60 * 1000);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            startBirthdaySystem,
            { once: true }
        );
    } else {
        startBirthdaySystem();
    }
})();