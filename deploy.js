const hre = require("hardhat");

async function main() {
    const MedicalRecords = await hre.ethers.getContractFactory("MedicalRecords");
    const medicalRecords = await MedicalRecords.deploy();
    await medicalRecords.deployed();

    console.log("MedicalRecords deployed to:", medicalRecords.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
