export const GRID_POWER_UPS = {
    0: {
        name: "Category Chooser",
        image: 
            document.getElementById("img_power_up_category_chooser"),
        image_available: 
            document.getElementById("img_power_up_category_chooser_active")
    },
    1: {
        name: "Removes 2 Answers",
        image: 
            document.getElementById("img_power_up_double_answer_remover"),
        image_available: document.getElementById(
            "img_power_up_double_answer_remover_active"
        )
    },
    2: {
        name: "Change to Question of the same Category",
        image: document.getElementById("img_power_up_question_changer"),
        image_available: 
            document.getElementById("img_power_up_question_changer_active")
    }
}