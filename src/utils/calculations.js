export const findItemDetail = (id, list) => {
        return list.find(item => item._id === id);
    }
    
export const calculateMaxValues = (profile) => {
    if (!profile || !profile.weight || !profile.height || !profile.age) {
        return { maxEnergy: 0, maxProtein: 0, maxCarbs: 0, maxFat: 0 };
    }

    const genderValue = (profile.sex === 1) ? 5 : -161;
    const maxEnergy = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) + genderValue;

    const maxProtein = profile.weight * 0.793664791;

    const maxCarbs = (maxEnergy / 2) / 4;

    const maxFat = (maxEnergy * 0.3) / 9;

    return {
        maxEnergy: Math.round(maxEnergy),
        maxProtein: Math.round(maxProtein),
        maxCarbs: Math.round(maxCarbs),
        maxFat: Math.round(maxFat),
    };
}

export const calculateActualValues = (day, allFoods, allExercises) => {
    if (!day) {
        return {
            consumedEnergy: 0,
            consumedProtein: 0,
            consumedCarbs: 0,
            consumedFat: 0,
            burnedEnergy: 0
        };
    }

    const consumedTotals = day.food.reduce((totals, foodEntry) => {
        const food = findItemDetail(foodEntry.foodId, allFoods);
        const factor = (food.baseAmount > 0) ? (foodEntry.amount / food.baseAmount) : 0;

        totals.energy += (food.energy || 0) * factor;
        totals.protein += (food.protein || 0) * factor;
        totals.carbs += (food.carbohydrates || 0) * factor;
        totals.fat += (food.fat || 0) * factor;

        return totals;
    }, {    
        energy: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    });

    const burnedEnergy = day.exercise.reduce((total, exerciseEntry) => {
        const exercise = findItemDetail(exerciseEntry.exerciseId, allExercises);
        const factor = (exercise.baseTime > 0) ? (exerciseEntry.timeInMinutes / exercise.baseTime) : 0;

        return total + (exercise.energyBurned || 0) * factor;
    }, 0);

    return {
        consumedEnergy: Math.round(consumedTotals.energy),
        consumedProtein: Math.round(consumedTotals.protein),
        consumedCarbs: Math.round(consumedTotals.carbs),
        consumedFat: Math.round(consumedTotals.fat),
        burnedEnergy: Math.round(burnedEnergy),
    };
};