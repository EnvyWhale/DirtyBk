import { mapMutations } from "vuex"
export const NavBarMixin = {
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations(['ChangeNavBarState'])
    },
    mounted() {
        this.ChangeNavBarState(false)
    },
    destroyed() {
        this.ChangeNavBarState(true)

    }
}