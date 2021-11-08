<script type="ts">
    export let dropped: boolean

    const name = 'AngleRight'
</script>

<div class={`${name} ${dropped ? `${name}-Dropped` : ''}`} />

<style lang="scss">
    .AngleRight {
        width: 15px;
        height: 15px;
        border-right: 2px solid #000;
        border-top: 2px solid #000;
        transform: rotate(45deg);
        transition: transform 0.3s;
        position: relative;
        top: 10px;

        &-Dropped {
            transform: rotate(135deg);
        }
    }
</style>
