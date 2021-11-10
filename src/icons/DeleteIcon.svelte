<script>
    import initCn from '../cn'

    const cn = initCn('DeleteIcon')
</script>

<div class={cn()} />

<style lang="scss">
    .DeleteIcon {
        width: 15px;
        height: 15px;
        position: relative;
        border-radius: 15px;

        &:after {
            content: '';
            height: 15px;
            border-left: 1px solid rgb(168, 167, 167);
            position: absolute;
            transform: rotate(45deg);
            left: 7px;
        }

        &:before {
            content: '';
            height: 15px;
            border-left: 1px solid rgb(168, 167, 167);
            position: absolute;
            transform: rotate(-45deg);
            left: 7px;
        }
    }
</style>
