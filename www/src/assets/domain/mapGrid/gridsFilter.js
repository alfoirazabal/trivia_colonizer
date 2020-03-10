export const GRID_FILTER_OPTIONS = {
    0: {
        name: "Dominating Players Filter",
        image: {
            activated: document.getElementById(
                "img_filter_icon_dominating_player"
            ),
            deactivated: document.getElementById(
                "img_filter_icon_dominating_player_deactivated"
            )
        }
    },
    1: {
        name: "Question Types Filter",
        image: {
            activated: document.getElementById(
                "img_filter_icon_question_category"
            ),
            deactivated: document.getElementById(
                "img_filter_icon_question_category_deactivated"
            )
        }
    },
    2: {
        name: "Question Difficulties Filter",
        image: {
            activated: document.getElementById(
                "img_filter_icon_question_difficulty"
            ),
            deactivated: document.getElementById(
                "img_filter_icon_question_difficulty_deactivated"
            )
        }
    }
}

export const GRID_FILTER_BUTTONS_POSITIONING = {
    START_POS_X: 115,
    RIGHT_MARGIN_X: 15,
    BUTTON_SIZE: 30
};