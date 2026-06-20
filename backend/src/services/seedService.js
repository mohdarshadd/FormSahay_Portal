const { dbService } = require('../config/db');

const initialSchemes = [
  {
    name: "National Post Matric Scholarship Scheme for SC/ST Students",
    category: "Scholarship",
    benefit: "Full tuition fee waiver and monthly maintenance allowance of up to ₹1,200",
    eligibility: {
      ageRange: { min: 15, max: 30 },
      categories: ["SC", "ST"],
      incomeLimit: 250000,
      education: "10th Pass", // 10th or 12th pass eligible
      state: "All"
    },
    documentsRequired: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Domicile Certificate", "Previous Class Marksheet"],
    deadline: new Date("2026-12-15T00:00:00.000Z"),
    contactInfo: {
      office: "Ministry of Social Justice and Empowerment",
      phone: "1800-112-200",
      email: "scholarship-support@gov.in"
    },
    instructions: [
      "Register on the National Scholarship Portal (NSP).",
      "Upload scanned copies of original certificates.",
      "Ensure your bank account is active and seeded with your Aadhaar number."
    ]
  },
  {
    name: "Post Matric Scholarship Scheme for OBC Students - Uttar Pradesh",
    category: "Scholarship",
    benefit: "Fee reimbursement and a monthly stipend of ₹500",
    eligibility: {
      ageRange: { min: 15, max: 28 },
      categories: ["OBC"],
      incomeLimit: 200000,
      education: "10th Pass",
      state: "Uttar Pradesh"
    },
    documentsRequired: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "UP Domicile Certificate", "College Fee Receipt"],
    deadline: new Date("2026-11-30T00:00:00.000Z"),
    contactInfo: {
      office: "UP Social Welfare Department",
      phone: "1800-180-5131",
      email: "helpdesk-up@gov.in"
    },
    instructions: [
      "Apply through the Saksham UP Scholarship portal.",
      "Submit the printed application form along with document physical copies to your college.",
      "Keep checking the application status on the UP scholarship portal."
    ]
  },
  {
    name: "PM Kisan Samman Nidhi Yojana",
    category: "Agriculture",
    benefit: "Direct income support of ₹6,000 per year in three equal installments",
    eligibility: {
      ageRange: { min: 18, max: 100 },
      categories: ["All"],
      incomeLimit: 600000, // General high threshold, main limit is land ownership
      education: "Below 10th", // accessible to all education levels
      state: "All"
    },
    documentsRequired: ["Aadhaar Card", "Land Khatauni (Land ownership records)", "Bank Passbook Copy", "Mobile Number linked to Aadhaar"],
    deadline: new Date("2026-10-31T00:00:00.000Z"),
    contactInfo: {
      office: "Ministry of Agriculture and Farmers Welfare",
      phone: "155261",
      email: "pmkisan-ict@gov.in"
    },
    instructions: [
      "Register via PM-Kisan Portal or through a Common Service Center (CSC).",
      "Authenticate your biometric or complete e-KYC using Aadhaar OTP.",
      "Verify that the land record spelling matches your Aadhaar details."
    ]
  },
  {
    name: "Ladli Behna Yojana - Madhya Pradesh",
    category: "Pension",
    benefit: "Monthly financial aid of ₹1,250 deposited directly to the beneficiary's bank account",
    eligibility: {
      ageRange: { min: 21, max: 60 },
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      incomeLimit: 250000,
      education: "Below 10th",
      state: "Madhya Pradesh"
    },
    documentsRequired: ["Aadhaar Card", "Samagra ID (Family ID)", "MP Domicile Certificate", "Bank Account seeded with Aadhaar and DBT active"],
    deadline: new Date("2026-09-30T00:00:00.000Z"),
    contactInfo: {
      office: "Women and Child Development Department, MP",
      phone: "181",
      email: "ladlibehna.wcd@mp.gov.in"
    },
    instructions: [
      "Form can be submitted at camp sites organized at Gram Panchayats or Ward offices.",
      "Provide Samagra ID and Aadhaar during the camp register.",
      "DBT (Direct Benefit Transfer) capability must be enabled on your bank account."
    ]
  },
  {
    name: "Central Sector Scheme of Scholarship for College and University Students",
    category: "Scholarship",
    benefit: "Scholarship of ₹12,000 per annum for graduation and ₹20,000 per annum for post-graduation",
    eligibility: {
      ageRange: { min: 17, max: 25 },
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      incomeLimit: 450000,
      education: "12th Pass",
      state: "All"
    },
    documentsRequired: ["Aadhaar Card", "Class 12th Marksheet showing above 80th percentile", "Income Certificate", "College Admission Proof"],
    deadline: new Date("2026-12-31T00:00:00.000Z"),
    contactInfo: {
      office: "Department of Higher Education, Ministry of Education",
      phone: "0120-6619540",
      email: "support-nsp@gov.in"
    },
    instructions: [
      "Verify your board marks percentile qualifies for the scholarship (top 20%).",
      "Apply under the Central Sector Scheme on the NSP portal.",
      "Get your application verified digitally by your college nodal officer."
    ]
  }
];

const seedSchemes = async () => {
  try {
    const existing = await dbService.getSchemes({});
    if (existing && existing.length > 0) {
      console.log(`🌱 Database already seeded with ${existing.length} schemes.`);
      return;
    }

    console.log("🌱 Seeding government schemes database...");
    for (const scheme of initialSchemes) {
      await dbService.createScheme(scheme);
    }
    console.log(`✅ Successfully seeded ${initialSchemes.length} schemes.`);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  }
};

module.exports = { seedSchemes };
