export type User = {
  uid: string;
  email: string;
  username: string;
  Ingredients: Ingredient[];
  medicalHistories: MedicalHistory[];
  // Supplementry
  height: number | null;
  weight: number | null;
  religion: string | null;
  age: number | null;
  gender: string | null;
};

// Two types below are for testing

export type Ingredient = {
  id: string; // e.g. CS 135, MATH 239, etc.
  name: string; // e.g. "Designing Functional Programs"
};

export type MedicalHistory = {
  id: string; // e.g. CS 135, MATH 239, etc.
  name: string; // e.g. "Designing Functional Programs"
};

// The params need to be passed in when navigating between the screens
export type InsideRootStackParamList = {
  BottomTabs: {};
  Setting: {};
  Test: {};
  UpdateUsername: {};
  UpdateIngredients: {};
  UpdateMedicalHistories: {};
  UpdateHeight: {};
  UpdateWeight: {};
  UpdateReligion: {};
  UpdateAge: {};
  UpdateGender: {};
};

export type OutsideRootStackParamList = {
  Login: {};
  ResetPassword: {};
};
