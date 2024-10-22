const sample_reports = [
  {
    _id: "1",
    cardioStatus: 1,
    status: "Normal",
    confidenceLevel: 0.95,
    patient: {
      _id: "123",
      name: "John Doe",
      email: "john@example.com",
      phone: "+123456789",
      age: 45,
      sex: 1,
      userType: "patient",
      createdAt: "2024-05-01T10:00:00Z",
    },
    doctor: {
      _id: "456",
      firstName: "Alice",
      lastName: "Smith",
      age: 40,
      sex: 1,
      phone: "+987654321",
      hospital: "City Hospital",
      supportingDocumentUrl: "https://example.com/supporting_document.pdf",
      bio: "Experienced cardiologist specializing in cardiovascular diseases.",
      email: "alice.smith@hospital.com",
      createdAt: "2024-04-20T09:00:00Z",
    },
    details: {
      age: 45,
      sex: 1,
      chestPainType: 0,
      restingBloodPressure: 120,
      serumColesterol: 200,
      fastingBloodSugarLevel: 100,
      restingElectrocardiographocResults: 0,
      maximumHeartRate: 160,
      exerciseInducedAngina: 0,
      stDepression: 0.5,
      slope: 1,
      numberOfMajorVessels: 0,
      thalliumStressTestResults: 2,
    },
    createdAt: "2024-05-15T12:00:00Z",
  },
  {
    _id: "2",
    cardioStatus: 2,
    status: "Abnormal",
    confidenceLevel: 0.8,
    patient: {
      _id: "789",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+987654321",
      age: 60,
      sex: 0,
      userType: "patient",
      createdAt: "2024-05-05T11:00:00Z",
    },
    doctor: {
      _id: "789",
      firstName: "Bob",
      lastName: "Johnson",
      age: 45,
      sex: 1,
      phone: "+123456789",
      hospital: "Central Hospital",
      supportingDocumentUrl: "https://example.com/supporting_document.pdf",
      bio: "Specialist in cardiovascular medicine with a focus on heart conditions.",
      email: "bob.johnson@hospital.com",
      createdAt: "2024-04-25T08:00:00Z",
    },
    details: {
      age: 60,
      sex: 0,
      chestPainType: 2,
      restingBloodPressure: 140,
      serumColesterol: 260,
      fastingBloodSugarLevel: 120,
      restingElectrocardiographocResults: 1,
      maximumHeartRate: 130,
      exerciseInducedAngina: 1,
      stDepression: 2.0,
      slope: 2,
      numberOfMajorVessels: 2,
      thalliumStressTestResults: 3,
    },
    createdAt: "2024-05-15T13:00:00Z",
  },
];

export default sample_reports;
