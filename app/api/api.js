export const getRecipes = async () => {
  try {
    const res = await fetch("https://recitore.vercel.app/api/Recipes", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get Recipes", error);
  }
};

export const getReviews = async () => {
  try {
    const res = await fetch(`https://recitore.vercel.app/api/Reviews`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return res.json();
  } catch (error) {
    console.log("Failed to get Reviews", error);
  }
};

export const getReviewsById = async (id) => {
  try {
    const res = await fetch(`https://recitore.vercel.app/api/Reviews/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return res.json();
  } catch (error) {
    console.log("Failed to get Reviews", error);
  }
};

export const getRecipesBySearch = async (query) => {
  try {
    const res = await fetch(
      `https://recitore.vercel.app/api/Search?query=${query}`,
      {
        method: "GET",
      }
    );
    return res.json();
  } catch (error) {
    console.log("Failed to get Recipes", error);
  }
};

export const getRecipeById = async (id) => {
  try {
    const res = await fetch(`https://recitore.vercel.app/api/Recipes/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get Recipes", error);
  }
};
