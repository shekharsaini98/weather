import { THEME_CHANGE,IS_SLIDE_SHOW,UPDATE_FILTER } from "./themeTypes"

export const themeChange = () => {
    return {
        type: THEME_CHANGE,
    }
}
export const isSlideShow = (slideshowprop) => {
    return{
        type: IS_SLIDE_SHOW,
        payload:slideshowprop
    }
}
export const updatefilter = (filterData) => {
    return{
        type:UPDATE_FILTER,
        payload:filterData
    }
}
