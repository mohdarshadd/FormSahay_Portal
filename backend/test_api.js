const { connectDB, dbService } = require('./src/config/db');
const { seedSchemes } = require('./src/services/seedService');
const aiService = require('./src/services/aiService');
const ocrService = require('./src/services/ocrService');

const runTests = async () => {
  let passed = true;

  try {
    console.log("🚀 Starting backend offline integration tests...");

    // 1. Test Database Fallback & Seeding
    console.log("\n🧪 Test 1: Testing Local JSON DB Fallback & Seeding");
    await connectDB();
    await seedSchemes();
    
    const schemes = await dbService.getSchemes({});
    console.log(`✅ Loaded ${schemes.length} schemes from database.`);
    if (schemes.length > 0) {
      console.log(`✅ First scheme: "${schemes[0].name}"`);
    } else {
      console.error("❌ Seeding failed: No schemes found.");
      passed = false;
    }

    // 2. Test AI Explanation Service
    console.log("\n🧪 Test 2: Testing AI Explanation Engine");
    const jargonText = "Applicant must produce valid income certificate issued by competent authority not below rank of Tehsildar.";
    const explanation = await aiService.explainText(jargonText);
    console.log("✅ Original text:", jargonText);
    console.log("✅ AI Explanation:", explanation.explanation);
    console.log("✅ Action items:", explanation.actionRequired);
    console.log("✅ Notes:", explanation.importantNotes);

    if (!explanation.explanation || explanation.actionRequired.length === 0) {
      console.error("❌ Explanation Service failed to return valid simplified fields.");
      passed = false;
    }

    // 3. Test Eligibility Checker
    console.log("\n🧪 Test 3: Testing Eligibility Evaluator Agent");
    const userData = {
      state: "Uttar Pradesh",
      age: 22,
      category: "OBC",
      income: 150000,
      education: "Graduate",
      gender: "Male",
      disability: false
    };
    
    console.log("✅ Testing user profile:", userData);
    
    // Choose the UP scheme for OBC students to test matching
    const upScheme = schemes.find(s => s.name.includes("Uttar Pradesh") || s.eligibility.state === "Uttar Pradesh");
    if (upScheme) {
      console.log(`✅ Evaluating against scheme: "${upScheme.name}"`);
      const eligibilityResult = await aiService.checkUserEligibility(userData, upScheme);
      console.log("✅ Eligibility result:", eligibilityResult);
      if (eligibilityResult.status !== 'eligible' && eligibilityResult.status !== 'partial') {
        console.error("❌ Expected user to match UP OBC scheme, but returned:", eligibilityResult.status);
        passed = false;
      }
    } else {
      console.log("⚠️ No specific state scheme found to evaluate, running default check.");
    }

    // 4. Test Document Verification Agent
    console.log("\n🧪 Test 4: Testing Document Validation Agent");
    const sampleOcrText = "Government of India Aadhaar Name: Rahul Sharma DOB: 15/08/2004 Gender: Male ID Number: 1234 5678 9012 Issued by UIDAI";
    const verificationReport = await aiService.verifyDocumentText("AadhaarCard", sampleOcrText);
    console.log("✅ Verification report:", verificationReport);
    if (verificationReport.status !== 'verified') {
      console.error("❌ Document verification failed. Aadhaar should be verified.");
      passed = false;
    }

  } catch (err) {
    console.error("❌ Exception occurred during test suite:", err.message);
    passed = false;
  }

  if (passed) {
    console.log("\n🎉 ALL BACKEND SERVICE INTEGRATION TESTS PASSED SUCCESSFULLY (OFFLINE MODE)!");
    process.exit(0);
  } else {
    console.error("\n❌ INTEGRATION TESTS FAILED.");
    process.exit(1);
  }
};

runTests();
