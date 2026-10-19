import { useEffect, useState } from "react";
import GymIllustration from "./GymIllustration";
import {
  ArrowLeft,
  Dumbbell,
  Target,
  BookOpen,
  History,
  ChartNoAxesCombined,
  ChevronRight,
  Flame,
  Clock,
  Plus,
  X,
} from "lucide-react";

const goals = [
  "Lean & Athletic",
  "Muscle Building",
  "Muscular & Lean",
  "Strength & Power",
  "Fitness & Endurance",
  "Beginner Fitness",
];

const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Quadriceps",
  "Hamstrings & Glutes",
  "Calves",
  "Abs & Core",
  "Forearms & Grip",
  "Full Body",
];

const exercises = [
  { name: "Barbell Bench Press", muscle: "Chest", equipment: "Barbell" },
  { name: "Incline Barbell Bench Press", muscle: "Chest", equipment: "Barbell" },
  { name: "Decline Barbell Bench Press", muscle: "Chest", equipment: "Barbell" },
  { name: "Dumbbell Bench Press", muscle: "Chest", equipment: "Dumbbells" },
  { name: "Incline Dumbbell Press", muscle: "Chest", equipment: "Dumbbells" },
  { name: "Decline Dumbbell Press", muscle: "Chest", equipment: "Dumbbells" },
  { name: "Dumbbell Fly", muscle: "Chest", equipment: "Dumbbells" },
  { name: "Incline Dumbbell Fly", muscle: "Chest", equipment: "Dumbbells" },
  { name: "Cable Crossover", muscle: "Chest", equipment: "Cable Machine" },
  { name: "Low Cable Fly", muscle: "Chest", equipment: "Cable Machine" },
  { name: "Pec Deck Fly", muscle: "Chest", equipment: "Machine" },
  { name: "Machine Chest Press", muscle: "Chest", equipment: "Machine" },
  { name: "Push-Up", muscle: "Chest", equipment: "Bodyweight" },
  { name: "Incline Push-Up", muscle: "Chest", equipment: "Bodyweight" },
  { name: "Decline Push-Up", muscle: "Chest", equipment: "Bodyweight" },
  { name: "Wide-Grip Push-Up", muscle: "Chest", equipment: "Bodyweight" },
  { name: "Diamond Push-Up", muscle: "Chest", equipment: "Bodyweight" },
  { name: "Chest Dip", muscle: "Chest", equipment: "Parallel Bars" },
  { name: "Dumbbell Pullover", muscle: "Chest", equipment: "Dumbbell" },
  { name: "Smith Machine Bench Press", muscle: "Chest", equipment: "Smith Machine" },
  { name: "Pull-Up", muscle: "Back", equipment: "Pull-Up Bar" },
  { name: "Chin-Up", muscle: "Back", equipment: "Pull-Up Bar" },
  { name: "Lat Pulldown", muscle: "Back", equipment: "Cable Machine" },
  { name: "Close-Grip Lat Pulldown", muscle: "Back", equipment: "Cable Machine" },
  { name: "Barbell Bent-Over Row", muscle: "Back", equipment: "Barbell" },
  { name: "Pendlay Row", muscle: "Back", equipment: "Barbell" },
  { name: "Single-Arm Dumbbell Row", muscle: "Back", equipment: "Dumbbell" },
  { name: "Chest-Supported Dumbbell Row", muscle: "Back", equipment: "Dumbbells" },
  { name: "Seated Cable Row", muscle: "Back", equipment: "Cable Machine" },
  { name: "T-Bar Row", muscle: "Back", equipment: "T-Bar" },
  { name: "Machine Row", muscle: "Back", equipment: "Machine" },
  { name: "Straight-Arm Pulldown", muscle: "Back", equipment: "Cable Machine" },
  { name: "Dumbbell Pullover (Back)", muscle: "Back", equipment: "Dumbbell" },
  { name: "Deadlift", muscle: "Back", equipment: "Barbell" },
  { name: "Rack Pull", muscle: "Back", equipment: "Barbell" },
  { name: "Back Extension", muscle: "Back", equipment: "Back Extension Bench" },
  { name: "Inverted Row", muscle: "Back", equipment: "Smith Machine" },
  { name: "Face-Down Y Raise", muscle: "Back", equipment: "Bodyweight" },
  { name: "Dumbbell Shrug", muscle: "Back", equipment: "Dumbbells" },
  { name: "Barbell Shrug", muscle: "Back", equipment: "Barbell" },
  { name: "Standing Overhead Press", muscle: "Shoulders", equipment: "Barbell" },
  { name: "Seated Dumbbell Shoulder Press", muscle: "Shoulders", equipment: "Dumbbells" },
  { name: "Arnold Press", muscle: "Shoulders", equipment: "Dumbbells" },
  { name: "Machine Shoulder Press", muscle: "Shoulders", equipment: "Machine" },
  { name: "Dumbbell Lateral Raise", muscle: "Shoulders", equipment: "Dumbbells" },
  { name: "Cable Lateral Raise", muscle: "Shoulders", equipment: "Cable Machine" },
  { name: "Machine Lateral Raise", muscle: "Shoulders", equipment: "Machine" },
  { name: "Dumbbell Front Raise", muscle: "Shoulders", equipment: "Dumbbells" },
  { name: "Plate Front Raise", muscle: "Shoulders", equipment: "Weight Plate" },
  { name: "Bent-Over Rear Delt Fly", muscle: "Shoulders", equipment: "Dumbbells" },
  { name: "Reverse Pec Deck", muscle: "Shoulders", equipment: "Machine" },
  { name: "Cable Rear Delt Fly", muscle: "Shoulders", equipment: "Cable Machine" },
  { name: "Face Pull", muscle: "Shoulders", equipment: "Cable Machine" },
  { name: "Barbell Upright Row", muscle: "Shoulders", equipment: "Barbell" },
  { name: "Dumbbell Upright Row", muscle: "Shoulders", equipment: "Dumbbells" },
  { name: "Push Press", muscle: "Shoulders", equipment: "Barbell" },
  { name: "Barbell Curl", muscle: "Biceps", equipment: "Barbell" },
  { name: "EZ-Bar Curl", muscle: "Biceps", equipment: "EZ Bar" },
  { name: "Alternating Dumbbell Curl", muscle: "Biceps", equipment: "Dumbbells" },
  { name: "Hammer Curl", muscle: "Biceps", equipment: "Dumbbells" },
  { name: "Incline Dumbbell Curl", muscle: "Biceps", equipment: "Dumbbells" },
  { name: "Concentration Curl", muscle: "Biceps", equipment: "Dumbbell" },
  { name: "Preacher Curl", muscle: "Biceps", equipment: "Preacher Bench" },
  { name: "Cable Biceps Curl", muscle: "Biceps", equipment: "Cable Machine" },
  { name: "High Cable Curl", muscle: "Biceps", equipment: "Cable Machine" },
  { name: "Spider Curl", muscle: "Biceps", equipment: "Dumbbells" },
  { name: "Reverse Curl", muscle: "Biceps", equipment: "EZ Bar" },
  { name: "Zottman Curl", muscle: "Biceps", equipment: "Dumbbells" },
  { name: "Cable Rope Pushdown", muscle: "Triceps", equipment: "Cable Machine" },
  { name: "Straight-Bar Pushdown", muscle: "Triceps", equipment: "Cable Machine" },
  { name: "Reverse-Grip Pushdown", muscle: "Triceps", equipment: "Cable Machine" },
  { name: "Overhead Dumbbell Extension", muscle: "Triceps", equipment: "Dumbbell" },
  { name: "Seated EZ-Bar Triceps Extension", muscle: "Triceps", equipment: "EZ Bar" },
  { name: "Skull Crusher", muscle: "Triceps", equipment: "EZ Bar" },
  { name: "Close-Grip Bench Press", muscle: "Triceps", equipment: "Barbell" },
  { name: "Triceps Dip", muscle: "Triceps", equipment: "Parallel Bars" },
  { name: "Bench Dip", muscle: "Triceps", equipment: "Bench" },
  { name: "Dumbbell Kickback", muscle: "Triceps", equipment: "Dumbbells" },
  { name: "Single-Arm Cable Extension", muscle: "Triceps", equipment: "Cable Machine" },
  { name: "Diamond Push-Up (Triceps)", muscle: "Triceps", equipment: "Bodyweight" },
  { name: "Barbell Back Squat", muscle: "Quadriceps", equipment: "Barbell" },
  { name: "Front Squat", muscle: "Quadriceps", equipment: "Barbell" },
  { name: "Goblet Squat", muscle: "Quadriceps", equipment: "Dumbbell" },
  { name: "Hack Squat", muscle: "Quadriceps", equipment: "Machine" },
  { name: "Smith Machine Squat", muscle: "Quadriceps", equipment: "Smith Machine" },
  { name: "Leg Press", muscle: "Quadriceps", equipment: "Leg Press Machine" },
  { name: "Leg Extension", muscle: "Quadriceps", equipment: "Machine" },
  { name: "Bulgarian Split Squat", muscle: "Quadriceps", equipment: "Dumbbells" },
  { name: "Walking Lunge", muscle: "Quadriceps", equipment: "Dumbbells" },
  { name: "Reverse Lunge", muscle: "Quadriceps", equipment: "Dumbbells" },
  { name: "Forward Lunge", muscle: "Quadriceps", equipment: "Bodyweight" },
  { name: "Step-Up", muscle: "Quadriceps", equipment: "Bench" },
  { name: "Sissy Squat", muscle: "Quadriceps", equipment: "Bodyweight" },
  { name: "Wall Sit", muscle: "Quadriceps", equipment: "Bodyweight" },
  { name: "Cyclist Squat", muscle: "Quadriceps", equipment: "Dumbbells" },
  { name: "Single-Leg Leg Press", muscle: "Quadriceps", equipment: "Leg Press Machine" },
  { name: "Heel-Elevated Squat", muscle: "Quadriceps", equipment: "Weight Plates" },
  { name: "Dumbbell Split Squat", muscle: "Quadriceps", equipment: "Dumbbells" },
  { name: "Romanian Deadlift", muscle: "Hamstrings & Glutes", equipment: "Barbell" },
  { name: "Dumbbell Romanian Deadlift", muscle: "Hamstrings & Glutes", equipment: "Dumbbells" },
  { name: "Stiff-Leg Deadlift", muscle: "Hamstrings & Glutes", equipment: "Barbell" },
  { name: "Barbell Hip Thrust", muscle: "Hamstrings & Glutes", equipment: "Barbell" },
  { name: "Glute Bridge", muscle: "Hamstrings & Glutes", equipment: "Bodyweight" },
  { name: "Single-Leg Glute Bridge", muscle: "Hamstrings & Glutes", equipment: "Bodyweight" },
  { name: "Cable Glute Kickback", muscle: "Hamstrings & Glutes", equipment: "Cable Machine" },
  { name: "Seated Leg Curl", muscle: "Hamstrings & Glutes", equipment: "Machine" },
  { name: "Lying Leg Curl", muscle: "Hamstrings & Glutes", equipment: "Machine" },
  { name: "Standing Leg Curl", muscle: "Hamstrings & Glutes", equipment: "Machine" },
  { name: "Nordic Hamstring Curl", muscle: "Hamstrings & Glutes", equipment: "Bodyweight" },
  { name: "Good Morning", muscle: "Hamstrings & Glutes", equipment: "Barbell" },
  { name: "Cable Pull-Through", muscle: "Hamstrings & Glutes", equipment: "Cable Machine" },
  { name: "Kettlebell Swing", muscle: "Hamstrings & Glutes", equipment: "Kettlebell" },
  { name: "Reverse Hyperextension", muscle: "Hamstrings & Glutes", equipment: "Machine" },
  { name: "45-Degree Back Extension", muscle: "Hamstrings & Glutes", equipment: "Back Extension Bench" },
  { name: "Frog Pump", muscle: "Hamstrings & Glutes", equipment: "Bodyweight" },
  { name: "Single-Leg Romanian Deadlift", muscle: "Hamstrings & Glutes", equipment: "Dumbbells" },
  { name: "Standing Calf Raise", muscle: "Calves", equipment: "Machine" },
  { name: "Seated Calf Raise", muscle: "Calves", equipment: "Machine" },
  { name: "Single-Leg Calf Raise", muscle: "Calves", equipment: "Bodyweight" },
  { name: "Leg Press Calf Raise", muscle: "Calves", equipment: "Leg Press Machine" },
  { name: "Donkey Calf Raise", muscle: "Calves", equipment: "Machine" },
  { name: "Smith Machine Calf Raise", muscle: "Calves", equipment: "Smith Machine" },
  { name: "Dumbbell Calf Raise", muscle: "Calves", equipment: "Dumbbells" },
  { name: "Calf Raise on Step", muscle: "Calves", equipment: "Bodyweight" },
  { name: "Bent-Knee Calf Raise", muscle: "Calves", equipment: "Dumbbells" },
  { name: "Tibialis Raise", muscle: "Calves", equipment: "Bodyweight" },
  { name: "Plank", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Side Plank", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Crunch", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Reverse Crunch", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Bicycle Crunch", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Hanging Knee Raise", muscle: "Abs & Core", equipment: "Pull-Up Bar" },
  { name: "Hanging Leg Raise", muscle: "Abs & Core", equipment: "Pull-Up Bar" },
  { name: "Captain's Chair Knee Raise", muscle: "Abs & Core", equipment: "Captain's Chair" },
  { name: "Cable Crunch", muscle: "Abs & Core", equipment: "Cable Machine" },
  { name: "Ab Wheel Rollout", muscle: "Abs & Core", equipment: "Ab Wheel" },
  { name: "Dead Bug", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Bird Dog", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Russian Twist", muscle: "Abs & Core", equipment: "Medicine Ball" },
  { name: "Mountain Climber", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Flutter Kicks", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "V-Up", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Hollow Body Hold", muscle: "Abs & Core", equipment: "Bodyweight" },
  { name: "Pallof Press", muscle: "Abs & Core", equipment: "Cable Machine" },
  { name: "Cable Wood Chop", muscle: "Abs & Core", equipment: "Cable Machine" },
  { name: "Weighted Sit-Up", muscle: "Abs & Core", equipment: "Weight Plate" },
  { name: "Wrist Curl", muscle: "Forearms & Grip", equipment: "Dumbbells" },
  { name: "Reverse Wrist Curl", muscle: "Forearms & Grip", equipment: "Dumbbells" },
  { name: "Barbell Wrist Curl", muscle: "Forearms & Grip", equipment: "Barbell" },
  { name: "Reverse EZ-Bar Wrist Curl", muscle: "Forearms & Grip", equipment: "EZ Bar" },
  { name: "Farmer's Carry", muscle: "Forearms & Grip", equipment: "Dumbbells" },
  { name: "Dead Hang", muscle: "Forearms & Grip", equipment: "Pull-Up Bar" },
  { name: "Plate Pinch Hold", muscle: "Forearms & Grip", equipment: "Weight Plates" },
  { name: "Wrist Roller", muscle: "Forearms & Grip", equipment: "Wrist Roller" },
  { name: "Barbell Static Hold", muscle: "Forearms & Grip", equipment: "Barbell" },
  { name: "Dumbbell Finger Curl", muscle: "Forearms & Grip", equipment: "Dumbbells" },
  { name: "Wrist Pronation", muscle: "Forearms & Grip", equipment: "Dumbbell" },
  { name: "Wrist Supination", muscle: "Forearms & Grip", equipment: "Dumbbell" },
  { name: "Burpee", muscle: "Full Body", equipment: "Bodyweight" },
  { name: "Dumbbell Thruster", muscle: "Full Body", equipment: "Dumbbells" },
  { name: "Barbell Thruster", muscle: "Full Body", equipment: "Barbell" },
  { name: "Dumbbell Snatch", muscle: "Full Body", equipment: "Dumbbell" },
  { name: "Power Clean", muscle: "Full Body", equipment: "Barbell" },
  { name: "Hang Clean", muscle: "Full Body", equipment: "Barbell" },
  { name: "Clean and Jerk", muscle: "Full Body", equipment: "Barbell" },
  { name: "Kettlebell Turkish Get-Up", muscle: "Full Body", equipment: "Kettlebell" },
  { name: "Man Maker", muscle: "Full Body", equipment: "Dumbbells" },
  { name: "Dumbbell Devil Press", muscle: "Full Body", equipment: "Dumbbells" },
  { name: "Bear Crawl", muscle: "Full Body", equipment: "Bodyweight" },
  { name: "Inchworm", muscle: "Full Body", equipment: "Bodyweight" },
  { name: "Jump Squat", muscle: "Full Body", equipment: "Bodyweight" },
  { name: "Skater Jump", muscle: "Full Body", equipment: "Bodyweight" },
  { name: "Medicine Ball Slam", muscle: "Full Body", equipment: "Medicine Ball" },
  { name: "Medicine Ball Chest Pass", muscle: "Full Body", equipment: "Medicine Ball" },
  { name: "Sled Push", muscle: "Full Body", equipment: "Weighted Sled" },
  { name: "Sled Drag", muscle: "Full Body", equipment: "Weighted Sled" },
  { name: "Battle Rope Waves", muscle: "Full Body", equipment: "Battle Ropes" },
  { name: "Kettlebell Goblet Squat", muscle: "Full Body", equipment: "Kettlebell" },
  { name: "Dumbbell Farmer Walk", muscle: "Full Body", equipment: "Dumbbells" },
  { name: "Kettlebell High Pull", muscle: "Full Body", equipment: "Kettlebell" },
];

export default function Gym({ onBack }) {
  const [page, setPage] = useState("dashboard");
  const [pageHistory, setPageHistory] = useState([]);

  function navigateTo(nextPage) {
    setPageHistory((previous) => [...previous, page]);
    setMessage("");
    setPage(nextPage);
  }

  function goBack() {
    if (pageHistory.length > 0) {
      const previousPage = pageHistory[pageHistory.length - 1];
      setPageHistory((previous) => previous.slice(0, -1));
      setMessage("");
      setPage(previousPage);
    } else if (page !== "dashboard") {
      setPage("dashboard");
    } else if (onBack) {
      onBack();
    }
  }
  const [goal, setGoal] = useState(() => {
    try {
      return localStorage.getItem("lifeos_gym_goal") || "Muscle Building";
    } catch {
      return "Muscle Building";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lifeos_gym_goal", goal);
    } catch {
      // Keep the current session usable if storage is unavailable.
    }
  }, [goal]);
  const [muscle, setMuscle] = useState("Chest");

const [trainingProfile, setTrainingProfile] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("lifeos_gym_profile")) || {
      experience: "Beginner",
      equipment: "Full Gym",
      daysPerWeek: "3",
      duration: "45",
      preference: "Balanced",
      limitations: "",
    };
  } catch {
    return {
      experience: "Beginner",
      equipment: "Full Gym",
      daysPerWeek: "3",
      duration: "45",
      preference: "Balanced",
      limitations: "",
    };
  }
});

useEffect(() => {
  try {
    localStorage.setItem("lifeos_gym_profile", JSON.stringify(trainingProfile));
  } catch {}
}, [trainingProfile]);

function updateTrainingProfile(field, value) {
  setTrainingProfile(previous => ({ ...previous, [field]: value }));
}

  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workout, setWorkout] = useState([]);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lifeos_gym_history") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("lifeos_gym_history", JSON.stringify(history));
  }, [history]);
  const [duration, setDuration] = useState("45");
  const [message, setMessage] = useState("");
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);

  function toggleMuscleGroup(group) {
    setSelectedMuscles((previous) => {
      if (previous.includes(group)) {
        return previous.filter((item) => item !== group);
      }
      if (previous.length >= 3) {
        setMessage("Choose up to 3 muscle groups. Deselect one to choose another.");
        return previous;
      }
      setMessage("");
      return [...previous, group];
    });
  }

  function getGoalRelevance(exercise) {
    const name = exercise.name.toLowerCase();
    const goalRules = {
      "Muscle Building": {
        high: ["bench press", "chest press", "row", "lat pulldown", "squat", "curl", "lateral raise", "triceps", "leg press", "romanian deadlift"],
      },
      "Strength & Power": {
        high: ["barbell bench press", "back squat", "deadlift", "overhead press", "pendlay row", "rack pull"],
      },
      "Fitness & Endurance": {
        high: ["jump squat", "skater jump", "battle rope", "sled push", "inchworm", "medicine ball slam", "farmer walk"],
      },
      "Lean & Athletic": {
        high: ["goblet squat", "pull-up", "push-up", "farmer walk", "inchworm", "split squat", "row"],
      },
      "Muscular & Lean": {
        high: ["bench press", "squat", "row", "lat pulldown", "romanian deadlift", "lateral raise", "leg press"],
      },
      "Beginner Fitness": {
        high: ["machine chest press", "seated cable row", "goblet squat", "incline push-up", "lat pulldown", "machine lateral raise"],
      },
    };

    const rules = goalRules[goal] || goalRules["Muscle Building"];
    if (rules.high.some((term) => name.includes(term))) return "High relevance";
    if (exercise.equipment === "Bodyweight" || exercise.equipment === "Machine") {
      return "Supporting exercise";
    }
    return "Useful exercise";
  }

  const filteredExercises = exercises.filter((exercise) => {
    const matchesMuscle = muscle === "All" || exercise.muscle === muscle;
    const matchesSelectedGroups =
      page !== "library" ||
      selectedMuscles.length === 0 ||
      selectedMuscles.includes(exercise.muscle);

    return (
      matchesMuscle &&
      matchesSelectedGroups &&
      exercise.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const recommendedExercises = [...filteredExercises].sort((a, b) => {
    const score = (exercise) => {
      const relevance = getGoalRelevance(exercise);
      return relevance === "High relevance" ? 2 : relevance === "Useful exercise" ? 1 : 0;
    };
    return score(b) - score(a);
  });

  function addExercise(exercise) {
    if (workout.some((item) => item.name === exercise.name)) {
      setMessage(`${exercise.name} is already in your workout.`);
      setSelectedExercise(null);
      return;
    }

    setWorkout((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${Math.random()}`,
        ...exercise,
        sets: [{ reps: "10", weight: "0" }],
      },
    ]);
    openPage("library");
    setSelectedExercise(null);
    setMessage(`${exercise.name} added to your workout.`);
  }

  function removeExerciseFromWorkout(exerciseName) {
    setWorkout((previous) =>
      previous.filter((item) => item.name !== exerciseName)
    );
    setMessage(`${exerciseName} removed from your workout.`);
    setSelectedExercise(null);
  }

  function updateSet(exerciseId, index, field, value) {
    setWorkout((previous) =>
      previous.map((exercise) =>
        exercise.id !== exerciseId
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set, i) =>
                i === index ? { ...set, [field]: value } : set
              ),
            }
      )
    );
  }

  function addSet(exerciseId) {
    setWorkout((previous) =>
      previous.map((exercise) =>
        exercise.id !== exerciseId
          ? exercise
          : {
              ...exercise,
              sets: [...exercise.sets, { reps: "10", weight: "0" }],
            }
      )
    );
  }

  function finishWorkout() {
    if (!workout.length) {
      setMessage("Add at least one exercise before finishing.");
      return;
    }

    const durationMinutes = Number(duration);

    if (
      typeof duration !== "string" ||
      !duration.trim() ||
      !Number.isFinite(durationMinutes) ||
      !Number.isInteger(durationMinutes) ||
      durationMinutes < 1 ||
      durationMinutes > 1440
    ) {
      setMessage("Enter a whole-number workout duration between 1 and 1440 minutes.");
      return;
    }

    for (const exercise of workout) {
      if (
        !exercise ||
        typeof exercise.name !== "string" ||
        !exercise.name.trim() ||
        !Array.isArray(exercise.sets) ||
        exercise.sets.length === 0
      ) {
        setMessage("Each exercise must have a name and at least one valid set.");
        return;
      }

      for (const set of exercise.sets) {
        const reps = Number(set?.reps);
        const weight = Number(set?.weight);

        if (
          set?.reps === "" ||
          set?.reps == null ||
          !Number.isInteger(reps) ||
          reps < 1 ||
          reps > 1000
        ) {
          setMessage("Repetitions must be a whole number between 1 and 1000.");
          return;
        }

        if (
          set?.weight === "" ||
          set?.weight == null ||
          !Number.isFinite(weight) ||
          weight < 0 ||
          weight > 10000
        ) {
          setMessage("Weight must be between 0 and 10000 kg.");
          return;
        }
      }
    }

    const completedWorkout = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      duration: durationMinutes,
      exercises: workout.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          reps: Number(set.reps),
          weight: Number(set.weight),
        })),
      })),
    };

    setHistory((previous) => [completedWorkout, ...previous]);
    setWorkout([]);
    setMessage("Workout saved for this session!");
    setPage("dashboard");
  }

  function openPage(nextPage) {
    setMessage("");
    if (nextPage === page) return;
    setPageHistory((previous) => [...previous, page]);
    setPage(nextPage);
  }

  function startEditingWorkout(item) {
    setEditingWorkoutId(item.id);
    setEditingWorkout({
      ...item,
      duration: String(item.duration ?? "45"),
      exercises: item.exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          reps: String(set.reps ?? "10"),
          weight: String(set.weight ?? "0"),
        })),
      })),
    });
    setMessage("");
    openPage("editHistory");
  }

  function updateEditingDuration(value) {
    setEditingWorkout((previous) => ({ ...previous, duration: value }));
  }

  function updateEditingSet(exerciseId, index, field, value) {
    setEditingWorkout((previous) => ({
      ...previous,
      exercises: previous.exercises.map((exercise) =>
        exercise.id !== exerciseId
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set, setIndex) =>
                setIndex === index ? { ...set, [field]: value } : set
              ),
            }
      ),
    }));
  }

  function removeEditingExercise(exerciseId) {
    setEditingWorkout((previous) => ({
      ...previous,
      exercises: previous.exercises.filter((exercise) => exercise.id !== exerciseId),
    }));
  }

  function addEditingSet(exerciseId) {
    setEditingWorkout((previous) => ({
      ...previous,
      exercises: previous.exercises.map((exercise) =>
        exercise.id !== exerciseId
          ? exercise
          : {
              ...exercise,
              sets: [...exercise.sets, { reps: "10", weight: "0" }],
            }
      ),
    }));
  }

  function saveEditedWorkout() {
    if (!editingWorkout || !editingWorkout.exercises.length) {
      setMessage("Keep at least one exercise in the workout.");
      return;
    }

    const durationMinutes = Number(editingWorkout.duration);
    if (
      !String(editingWorkout.duration).trim() ||
      !Number.isInteger(durationMinutes) ||
      durationMinutes < 1 ||
      durationMinutes > 1440
    ) {
      setMessage("Duration must be a whole number between 1 and 1440 minutes.");
      return;
    }

    for (const exercise of editingWorkout.exercises) {
      if (!exercise.name?.trim() || !exercise.sets?.length) {
        setMessage("Each exercise needs a name and at least one set.");
        return;
      }

      for (const set of exercise.sets) {
        const reps = Number(set.reps);
        const weight = Number(set.weight);
        if (
          String(set.reps).trim() === "" ||
          !Number.isInteger(reps) ||
          reps < 1 ||
          reps > 1000
        ) {
          setMessage("Repetitions must be a whole number between 1 and 1000.");
          return;
        }
        if (
          String(set.weight).trim() === "" ||
          !Number.isFinite(weight) ||
          weight < 0 ||
          weight > 10000
        ) {
          setMessage("Weight must be between 0 and 10000 kg.");
          return;
        }
      }
    }

    const savedWorkout = {
      ...editingWorkout,
      duration: durationMinutes,
      exercises: editingWorkout.exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          reps: Number(set.reps),
          weight: Number(set.weight),
        })),
      })),
    };

    setHistory((previous) =>
      previous.map((item) => item.id === editingWorkoutId ? savedWorkout : item)
    );
    setEditingWorkoutId(null);
    setEditingWorkout(null);
    setMessage("Workout updated.");
    openPage("history");
  }

  function cancelEditingWorkout() {
    setEditingWorkoutId(null);
    setEditingWorkout(null);
    setMessage("");
    openPage("history");
  }

  function deleteWorkout(item) {
    const confirmed = window.confirm(
      `Delete the workout from ${item.date}? This cannot be undone.`
    );
    if (!confirmed) return;

    setHistory((previous) => previous.filter((entry) => entry.id !== item.id));
    setMessage("Workout deleted.");
  }

  function Header({ title, subtitle }) {
    return (
      <header className="gym-page-header">
        <button className="gym-back" onClick={goBack}>
          <ArrowLeft size={21} />
        </button>
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </header>
    );
  }

  return (
    <main className="dashboard gym-screen">
      {page === "dashboard" && (
        <>
          <Header title="Gym & Fitness 💪" subtitle="Build strength, one rep at a time." />

          <section className="gym-hero-card">
            <span>YOUR FITNESS JOURNEY</span>
            <h2>Stronger every day.</h2>
            <p>Your goal: {goal}</p>
            <button onClick={() => openPage("goals")}>Choose your goal <ChevronRight size={17} /></button>
            <div className="gym-hero-emoji">🏋️</div>
          </section>

          <div className="section-heading">
            <div><h2>Your Training</h2><p>Everything you need for your next workout.</p></div>
          </div>

          <section className="gym-menu-grid">
            <button onClick={() => openPage("muscleSelection")}>
              <span className="gym-menu-icon pink"><Dumbbell /></span>
              <strong>Start Workout</strong>
              <small>Log exercises and sets</small>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => openPage("library")}>
              <span className="gym-menu-icon purple"><BookOpen /></span>
              <strong>Exercise Library</strong>
              <small>Explore exercises</small>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => openPage("history")}>
              <span className="gym-menu-icon blue"><History /></span>
              <strong>Workout History</strong>
              <small>{history.length} saved workouts</small>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => openPage("report")}>
              <span className="gym-menu-icon green"><ChartNoAxesCombined /></span>
              <strong>Weekly Report</strong>
              <small>Review your progress</small>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => openPage("profile")}>
              <span className="gym-menu-icon pink"><Target /></span>
              <strong>Training Profile</strong>
              <small>{trainingProfile.experience} · {trainingProfile.daysPerWeek} days/week</small>
              <ChevronRight size={18} />
            </button>
          </section>

          <section className="gym-summary-card">
            <div><Flame size={21} /><span>Workouts completed</span></div>
            <strong>{history.length}</strong>
            <p>Keep showing up. Rest days are part of progress, too.</p>
          </section>

          {message && <p className="gym-message">{message}</p>}
        </>
      )}

      {page === "profile" && (
        <>
          <Header title="Training Profile" subtitle="Personalize your workout recommendations." />
          <section className="gym-profile-form">
            <label>Experience level
              <select value={trainingProfile.experience} onChange={e => updateTrainingProfile("experience", e.target.value)}>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
            </label>
            <label>Available equipment
              <select value={trainingProfile.equipment} onChange={e => updateTrainingProfile("equipment", e.target.value)}>
                <option>Full Gym</option><option>Dumbbells</option><option>Home Equipment</option><option>Bodyweight Only</option>
              </select>
            </label>
            <label>Training days per week
              <select value={trainingProfile.daysPerWeek} onChange={e => updateTrainingProfile("daysPerWeek", e.target.value)}>
                <option value="2">2 days</option><option value="3">3 days</option><option value="4">4 days</option><option value="5">5 days</option><option value="6">6 days</option>
              </select>
            </label>
            <label>Preferred workout duration
              <select value={trainingProfile.duration} onChange={e => updateTrainingProfile("duration", e.target.value)}>
                <option value="20">20 minutes</option><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option><option value="90">90 minutes</option>
              </select>
            </label>
            <label>Training preference
              <select value={trainingProfile.preference} onChange={e => updateTrainingProfile("preference", e.target.value)}>
                <option>Balanced</option><option>Strength</option><option>Muscle Growth</option><option>Conditioning</option>
              </select>
            </label>
            <label>Movement limitations (optional)
              <textarea rows="3" value={trainingProfile.limitations} onChange={e => updateTrainingProfile("limitations", e.target.value)} placeholder="Any movements your plan should account for?" />
            </label>
            <p className="gym-profile-saved">✓ Preferences save automatically on this device.</p>
            <button className="primary-button gym-full-button" onClick={() => openPage("dashboard")}>Save & Return to Dashboard</button>
          </section>
        </>
      )}
      {page === "goals" && (
        <>
          <Header title="Fitness Goals" subtitle="Choose the direction that suits you." />
          <section className="gym-goal-list">
            {goals.map((item) => (
              <button
                key={item}
                className={goal === item ? "gym-goal selected" : "gym-goal"}
                onClick={() => setGoal(item)}
              >
                <span><Target size={20} /></span>
                <strong>{item}</strong>
                <span>{goal === item ? "✓" : "+"}</span>
              </button>
            ))}
          </section>
          <button className="primary-button gym-full-button" onClick={() => openPage("dashboard")}>Save Goal</button>
        </>
      )}

      {page === "muscleSelection" && (
        <>
          <Header title="Select Muscle Groups" subtitle="Choose up to 3 groups for your workout." />

          <label className="gym-duration">
            Workout duration (minutes)
            <input
              type="number"
              min="1"
              max="1440"
              step="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>

          <div className="gym-selection-count">
            Selected: <strong>{selectedMuscles.length}/3</strong>
          </div>

          <section className="gym-muscle-selection-grid">
            {muscleGroups.filter((item) => item !== "Full Body").map((item) => {
              const selected = selectedMuscles.includes(item);
              const limitReached = selectedMuscles.length >= 3 && !selected;
              const details = {
                "Chest": ["🏋️", "Pectoral muscles · Pressing movements"],
                "Back": ["🧍", "Upper and lower back · Pulling movements"],
                "Shoulders": ["💪", "Deltoids · Overhead movements"],
                "Biceps": ["💪", "Front upper arm · Curling movements"],
                "Triceps": ["🦾", "Back upper arm · Extension movements"],
                "Quadriceps": ["🦵", "Front thighs · Squat movements"],
                "Hamstrings & Glutes": ["🏃", "Back thighs and glutes · Hip movements"],
                "Calves": ["🦵", "Lower legs · Calf raises"],
                "Abs & Core": ["🤸", "Abdominals and trunk stability"],
                "Forearms & Grip": ["✊", "Forearm muscles and grip strength"],
              }[item] || ["🏋️", "Strength and movement training"];

              return (
                <button
                  key={item}
                  type="button"
                  className={`gym-muscle-selection-card${selected ? " selected" : ""}`}
                  disabled={limitReached}
                  aria-pressed={selected}
                  onClick={() => toggleMuscleGroup(item)}
                >
                  <span className="gym-muscle-cartoon" aria-hidden="true">{details[0]}</span>
                  <span className="gym-muscle-card-copy">
                    <strong>{item}</strong>
                    <small>{details[1]}</small>
                  </span>
                  <span className="gym-muscle-check" aria-hidden="true">{selected ? "✓" : "+"}</span>
                </button>
              );
            })}
          </section>

          {message && <p className="gym-message">{message}</p>}

          <button
            className="primary-button gym-full-button"
            disabled={selectedMuscles.length === 0}
            onClick={() => {
              setMuscle("All");
              setSearch("");
              setMessage("");
              openPage("library");
            }}
          >
            Continue to Exercises
          </button>
        </>
      )}

      {page === "library" && (
        <>
          <Header title="Exercise Library" subtitle={`${exercises.length} starter exercises`} />
          {workout.length > 0 && (
            <button
              type="button"
              className="primary-button gym-full-button"
              onClick={() => openPage("workout")}
            >
              View Current Workout ({workout.length} {workout.length === 1 ? "exercise" : "exercises"})
            </button>
          )}
          {message && <p className="gym-message" role="status">{message}</p>}
          <input className="gym-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search exercises..." />
          <div className="gym-muscle-filter">
            <button className={muscle === "All" ? "selected" : ""} onClick={() => setMuscle("All")}>All</button>
            {muscleGroups.map((item) => (
              <button key={item} className={muscle === item ? "selected" : ""} onClick={() => setMuscle(item)}>{item}</button>
            ))}
          </div>
          <section className="gym-exercise-list">
            {recommendedExercises.map((exercise) => {
              const isSelected = workout.some((item) => item.name === exercise.name);

              return (
                <button
                  key={exercise.name}
                  onClick={() => setSelectedExercise(exercise)}
                  aria-label={`${exercise.name}${isSelected ? ", already added" : ", not added"}`}
                >
                  <span className="exercise-mini-icon"><Dumbbell size={20} /></span>
                  <span>
                    <strong>{exercise.name}</strong>
                    <small>{exercise.muscle} · {exercise.equipment}</small>
                  </span>
                  {isSelected
                    ? <strong aria-label="Added">✓ Added</strong>
                    : <span aria-label="Not added">＋ Add</span>}
                </button>
              );
            })}
            {!filteredExercises.length && <p>No exercises found. Try another search or muscle group.</p>}
          </section>
          {selectedExercise && (
            <div className="gym-modal-backdrop" onClick={() => setSelectedExercise(null)}>
              <section className="gym-exercise-modal" onClick={(e) => e.stopPropagation()}>
                <button className="gym-modal-close" onClick={() => setSelectedExercise(null)}><X /></button>
                <GymIllustration muscle={selectedExercise.muscle} />
                <h2>{selectedExercise.name}</h2>
                <div className="gym-detail-tags">
                  <span>🎯 {selectedExercise.muscle}</span>
                  <span>🏋️ {selectedExercise.equipment}</span>
                  <span>📈 Beginner-friendly pace</span>
                </div>
                <h3>How to perform</h3>
                <ol className="gym-exercise-instructions">
                  {(selectedExercise.name.toLowerCase().includes("reverse pec deck")
                    ? ["Adjust the seat so the handles are around shoulder height.", "Keep your chest against the pad and hold the handles with a soft bend in your elbows.", "Move your arms outward and back, squeezing your rear shoulders without shrugging.", "Return slowly until you feel a comfortable stretch."]
                    : selectedExercise.name.toLowerCase().includes("lateral raise")
                    ? ["Stand tall with a slight bend in your elbows and weights by your sides.", "Raise your arms outward to about shoulder height without swinging.", "Keep your shoulders relaxed and wrists neutral.", "Lower the weights slowly to the starting position."]
                    : selectedExercise.name.toLowerCase().includes("bench press") || selectedExercise.name.toLowerCase().includes("chest press")
                    ? ["Lie securely on the bench and plant your feet on the floor.", "Grip the bar or handles evenly and keep your shoulder blades stable.", "Lower the weight under control toward your mid-chest.", "Press upward smoothly without bouncing or forcefully locking your elbows."]
                    : selectedExercise.name.toLowerCase().includes("squat")
                    ? ["Stand with feet around shoulder-width apart and brace your core.", "Bend your hips and knees, keeping your whole foot planted.", "Lower only as far as you can while maintaining comfortable, controlled form.", "Push through your feet to stand tall without letting your knees collapse inward."]
                    : selectedExercise.name.toLowerCase().includes("curl")
                    ? ["Stand or sit tall with your elbows close to your sides.", "Curl the weight without swinging your torso.", "Pause briefly near the top while keeping your wrists comfortable.", "Lower slowly until your arms return to the starting position."]
                    : ["Set up your position and equipment securely before starting.", "Brace your core and keep your movement controlled.", "Move through a comfortable range of motion without bouncing.", "Return slowly to the starting position and repeat with good form."]
                  ).map((step, index) => <li key={index}>{step}</li>)}
                </ol>
                <h3>Form tips</h3>
                <p>Use a manageable load, breathe steadily, and keep your joints aligned. Stop if you feel sharp pain.</p>
                <h3>Common mistakes</h3>
                <p>Avoid swinging the weight, rushing repetitions, or using more weight than you can control.</p>
                {workout.some((item) => item.name === selectedExercise.name) ? (
                  <button
                    className="primary-button"
                    onClick={() => removeExerciseFromWorkout(selectedExercise.name)}
                  >
                    Remove from Workout
                  </button>
                ) : (
                  <button
                    className="primary-button"
                    onClick={() => addExercise(selectedExercise)}
                  >
                    Add to Workout
                  </button>
                )}
              </section>
            </div>
          )}
        </>
      )}

      {page === "workout" && (
        <>
          <Header title="Active Workout" subtitle={`Record your training session · ${duration || "—"} minutes`} />
          <button className="gym-add-exercise" onClick={() => openPage("library")}><Plus size={19} /> Add Exercise</button>
          {!workout.length && <div className="empty-state"><div>🏋️</div><h3>Ready when you are</h3><p>Add exercises from the library to begin logging sets.</p><button className="primary-button" onClick={() => openPage("library")}>Browse Exercises</button></div>}
          {workout.map((exercise) => (
            <article className="gym-log-card" key={exercise.id}>
              <div className="gym-log-title"><div><strong>{exercise.name}</strong><small>{exercise.muscle} · {exercise.equipment}</small></div>
                <button onClick={() => setWorkout((prev) => prev.filter((item) => item.id !== exercise.id))}><X size={18} /></button>
              </div>
              <div className="gym-set-heading"><span>SET</span><span>REPS</span><span>WEIGHT (KG)</span><span /></div>
              {exercise.sets.map((set, index) => (
                <div className="gym-set-row" key={index}>
                  <span>{index + 1}</span>
                  <input type="number" min="1" value={set.reps} onChange={(e) => updateSet(exercise.id, index, "reps", e.target.value)} />
                  <input type="number" min="0" step="0.5" value={set.weight} onChange={(e) => updateSet(exercise.id, index, "weight", e.target.value)} />
                  <button onClick={() => updateSet(exercise.id, index, "reps", set.reps)}>✓</button>
                </div>
              ))}
              <button className="gym-add-set" onClick={() => addSet(exercise.id)}><Plus size={16} /> Add Set</button>
            </article>
          ))}
          <button className="primary-button gym-full-button" onClick={finishWorkout}>Finish Workout</button>
          {message && <p className="gym-message">{message}</p>}
        </>
      )}

      {page === "editHistory" && editingWorkout && (
        <>
          <Header
            title="Edit Workout"
            subtitle={`Correct your saved session · ${editingWorkout.date}`}
          />

          <label className="gym-duration">
            Workout duration (minutes)
            <input
              type="number"
              min="1"
              max="1440"
              step="1"
              value={editingWorkout.duration}
              onChange={(e) => updateEditingDuration(e.target.value)}
            />
          </label>

          {editingWorkout.exercises.map((exercise) => (
            <article className="gym-log-card" key={exercise.id}>
              <div className="gym-log-title">
                <div>
                  <strong>{exercise.name}</strong>
                  <small>{exercise.muscle} · {exercise.equipment}</small>
                </div>
                <button
                  type="button"
                  onClick={() => removeEditingExercise(exercise.id)}
                  aria-label={`Remove ${exercise.name}`}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="gym-set-heading">
                <span>SET</span><span>REPS</span><span>WEIGHT (KG)</span><span />
              </div>

              {exercise.sets.map((set, index) => (
                <div className="gym-set-row" key={index}>
                  <span>{index + 1}</span>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    step="1"
                    aria-label={`${exercise.name} set ${index + 1} repetitions`}
                    value={set.reps}
                    onChange={(e) =>
                      updateEditingSet(exercise.id, index, "reps", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    step="0.5"
                    aria-label={`${exercise.name} set ${index + 1} weight`}
                    value={set.weight}
                    onChange={(e) =>
                      updateEditingSet(exercise.id, index, "weight", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditingWorkout((previous) => ({
                        ...previous,
                        exercises: previous.exercises.map((item) =>
                          item.id !== exercise.id
                            ? item
                            : {
                                ...item,
                                sets: item.sets.filter((_, i) => i !== index),
                              }
                        ),
                      }))
                    }
                    aria-label={`Remove set ${index + 1}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="gym-add-set"
                onClick={() => addEditingSet(exercise.id)}
              >
                <Plus size={16} /> Add Set
              </button>
            </article>
          ))}

          {message && <p className="gym-message" role="alert">{message}</p>}

          <button
            type="button"
            className="primary-button gym-full-button"
            onClick={saveEditedWorkout}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="gym-full-button"
            onClick={cancelEditingWorkout}
          >
            Cancel
          </button>
        </>
      )}

      {page === "history" && (
        <>
          <Header title="Workout History" subtitle="Your completed sessions." />
          {!history.length && <div className="empty-state"><div>📅</div><h3>No workouts yet</h3><p>Finished workouts will appear here.</p><button className="primary-button" onClick={() => openPage("workout")}>Start First Workout</button></div>}
          {history.map((item) => (
            <article className="gym-history-card" key={item.id}>
              <div className="gym-history-icon"><Dumbbell /></div>
              <div>
                <strong>{item.date}</strong>
                <p>{item.exercises.length} exercises · {item.duration} minutes</p>
                <small>{item.exercises.map((e) => e.name).join(", ")}</small>
                <div className="gym-history-actions">
                  <button type="button" onClick={() => startEditingWorkout(item)}>
                    Edit Workout
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteWorkout(item)}
                    aria-label={`Delete workout from ${item.date}`}
                  >
                    Delete Workout
                  </button>
                </div>
              </div>
            </article>
          ))}
        </>
      )}

      {page === "report" && (
        <>
          <Header title="Weekly Gym Report" subtitle="A simple overview of your training." />
          <section className="gym-report-grid">
            <div><span>Workouts</span><strong>{history.length}</strong></div>
            <div><span>Total minutes</span><strong>{history.reduce((sum, item) => sum + Number(item.duration || 0), 0)}</strong></div>
            <div><span>Exercises logged</span><strong>{history.reduce((sum, item) => sum + item.exercises.length, 0)}</strong></div>
            <div><span>Sets logged</span><strong>{history.reduce((sum, item) => sum + item.exercises.reduce((s, e) => s + e.sets.length, 0), 0)}</strong></div>
          </section>
          <div className="empty-state"><div>🌱</div><h3>Build your baseline</h3><p>Complete workouts to populate your progress report. This starter report currently summarizes all saved sessions, not just the current week.</p></div>
        </>
      )}

      <nav className="bottom-nav">
        <button className="nav-item" onClick={onBack}><ArrowLeft size={21} /><span>Back</span></button>
        <button className={page === "dashboard" ? "nav-item active" : "nav-item"} onClick={() => openPage("dashboard")}><Dumbbell size={21} /><span>Gym</span></button>
        <button className={page === "library" ? "nav-item active" : "nav-item"} onClick={() => openPage("library")}><BookOpen size={21} /><span>Library</span></button>
        <button className={page === "history" ? "nav-item active" : "nav-item"} onClick={() => openPage("history")}><History size={21} /><span>History</span></button>
      </nav>
    </main>
  );
}
