
window.ministersAppointeeData = [
    {
        // ==============================
        // BASIC INFORMATION
        // ==============================
        id: "map001",
        name: "ERIC ANDOH",
        position: "Minister for Defence",
        ministry: "Office of the Ministry of Defence",
        region: "Greater Accra",
        appointmentDate: "25th September, 2026",
        status: "revoked",
        isMP: true,
        mpId: "mp001",
        constituency: "Ayawaso West",

        // ==============================
        // PROFILE INFORMATION
        // ==============================
        education: "Ghana Communication Technology University, Bachelor of Science in Information Technology, expected 2027; Kikam Technical Institute, Electricals and Electronics Engineering Technology, NABPTEX, June 2017; Emmanuel Preparatory School, Abura, Western Region, Basic Education Certificate Examination, June 2014. Certifications: Networking Engineering, Honors Diploma, Soul Food ICT College, June 2021; Digital Security, Honors Diploma, Soul Food ICT College, September 2021; Tech Accelerate 2024, Certificate of Completion, Lady Margaret Foundation; Effective Presentation, HP LIFE Online Course, 2025.",

        profession: "IT Student / Front-End Developer / Graphic Designer",

        experience: "Graphic Designer, Ericsvault Hub, Accra, January 2025–Present; Computer Teacher, Antah Academy, Accra-Abeka, January 2021–January 2025; Course Representative, Ghana Communication Technology University, 2023–Present; Public Relations Officer, Concerned Youth of Enmokanwo, 2024–Present; Committee Chair, Entrepreneurship Club, GCTU, 2024–2025; Vice President, GNAAS, Kikam Technical Institute, 2016–2017.",

        biography: "Eric Andoh is an Information Technology student, front-end developer and graphic designer with a background in Electrical and Electronics Engineering. He combines technical knowledge in electronics and electrical systems with practical experience in web development, UI/UX design, graphic design, digital instruction and technical support. He has professional experience as a Graphic Designer at Ericsvault Hub and as a Computer Teacher at Antah Academy. He has developed practical digital solutions, including a Multi-Semester GPA and CWA Calculator and a Church Attendance and Management System. He has demonstrated leadership through his roles as Course Representative at Ghana Communication Technology University, Public Relations Officer of Concerned Youth of Enmokanwo, Committee Chair of the GCTU Entrepreneurship Club and Vice President of GNAAS at Kikam Technical Institute. His achievements include being named Best Graphic Designer of the Year at the Ghana Talent and Achievement Awards in 2022. He is passionate about leveraging technology, engineering knowledge, creativity and leadership to develop innovative solutions and improve user experiences.",

        skills: "HTML, CSS, JavaScript • UI/UX Design • Graphic Design • MySQL • Local Storage • Git • VS Code • Draw.io • Adobe Creative Cloud • Communication • Teamwork • Problem Solving • Troubleshooting",

        certifications: "Networking Engineering — Honors Diploma, Soul Food ICT College, June 2021. Digital Security — Honors Diploma, Soul Food ICT College, September 2021. Tech Accelerate 2024 — Certificate of Completion, Lady Margaret Foundation. Effective Presentation — HP LIFE Online Course, 2025.",

        achievements: "Best Graphic Designer of the Year — Ghana Talent and Achievement Awards, 2022.",

        projects: "Multi-Semester GPA & CWA Calculator — A responsive academic calculator with semester-based GPA/FGPA computation, grade classification and print support using HTML, CSS and JavaScript. Church Attendance Management System — A responsive web-based system developed using HTML, CSS and JavaScript for managing church members, attendance, upcoming services, birthdays, statistics and member/administrator access.",

        leadership: "Course Representative, Ghana Communication Technology University (2023–Present); Public Relations Officer, Concerned Youth of Enmokanwo (2024–Present); Committee Chair, Entrepreneurship Club, GCTU (2024–2025); Vice President, GNAAS, Kikam Technical Institute (2016–2017).",

        languages: "English • Twi • Nzema",

        // ==============================
        // PROFILE PHOTO
        // ==============================
        image: "images/profericus2.png",

        // ==============================
        // CONTACT INFORMATION
        // ==============================
        email: "ericandoh005@gmail.com",
        phone: "0542044490",
        website: "https://prof-ericus.github.io/YPG/",

        // ==============================
        // REVOCATION INFORMATION
        // ==============================
        revokedReason: ""
    }
];


/* =========================================================
   SHARED STATUS HELPERS
========================================================= */

/**
 * Normalize status values consistently.
 * Only an explicit "active" status grants public access.
 */
window.isActiveMinisterAppointee = function (record) {
    return Boolean(
        record &&
        String(record.status || "").trim().toLowerCase() === "active"
    );
};


/**
 * Check whether a record has been revoked.
 */
window.isRevokedMinisterAppointee = function (record) {
    return Boolean(
        record &&
        String(record.status || "").trim().toLowerCase() === "revoked"
    );
};


/* =========================================================
   FIND ACTIVE APPOINTEE BY ID — PUBLIC USE
========================================================= */

window.getMinisterAppointeeById = function (id) {
    if (!id || !Array.isArray(window.ministersAppointeeData)) {
        return null;
    }

    const requestedId = String(id).trim().toLowerCase();

    return window.ministersAppointeeData.find(function (record) {
        const recordId = String(record.id || "").trim().toLowerCase();

        return (
            recordId === requestedId &&
            window.isActiveMinisterAppointee(record)
        );
    }) || null;
};


/* =========================================================
   FIND ANY APPOINTEE BY ID — ADMINISTRATIVE USE
   Includes active and revoked records.
========================================================= */

window.getAnyMinisterAppointeeById = function (id) {
    if (!id || !Array.isArray(window.ministersAppointeeData)) {
        return null;
    }

    const requestedId = String(id).trim().toLowerCase();

    return window.ministersAppointeeData.find(function (record) {
        return String(record.id || "").trim().toLowerCase() === requestedId;
    }) || null;
};


/* =========================================================
   GET ACTIVE APPOINTEES — PUBLIC DIRECTORY
========================================================= */

window.getActiveMinisterAppointees = function () {
    if (!Array.isArray(window.ministersAppointeeData)) {
        return [];
    }

    return window.ministersAppointeeData.filter(function (record) {
        return window.isActiveMinisterAppointee(record);
    });
};


/* =========================================================
   GET REVOKED APPOINTEES — ADMINISTRATIVE USE
========================================================= */

window.getRevokedMinisterAppointees = function () {
    if (!Array.isArray(window.ministersAppointeeData)) {
        return [];
    }

    return window.ministersAppointeeData.filter(function (record) {
        return window.isRevokedMinisterAppointee(record);
    });
};


/* =========================================================
   GET ALL NON-ACTIVE APPOINTEES — ADMINISTRATIVE USE
   Includes revoked, suspended, inactive and unknown statuses.
========================================================= */

window.getNonActiveMinisterAppointees = function () {
    if (!Array.isArray(window.ministersAppointeeData)) {
        return [];
    }

    return window.ministersAppointeeData.filter(function (record) {
        return !window.isActiveMinisterAppointee(record);
    });
};


/* =========================================================
   REINSTATE AN APPOINTEE
   Updates the current JavaScript data in memory only.
========================================================= */

window.reinstateMinisterAppointee = function (id) {
    const record = window.getAnyMinisterAppointeeById(id);

    if (!record) {
        return false;
    }

    record.status = "active";
    record.revokedReason = "";

    return true;
};


/* =========================================================
   REVOKE AN APPOINTEE
   Updates the current JavaScript data in memory only.
========================================================= */

window.revokeMinisterAppointee = function (id, reason) {
    const record = window.getAnyMinisterAppointeeById(id);

    if (!record) {
        return false;
    }

    record.status = "revoked";
    record.revokedReason = String(reason || "").trim();

    return true;
};
