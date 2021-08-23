<script type="ts">
    export let isDropped: boolean
</script>

<div class={`AngleRight ${isDropped ? 'AngleRight-Dropped' : ''}`} />

<style>
    .AngleRight {
        width: 15px;
        height: 15px;
        border-right: 2px solid #000;
        border-top: 2px solid #000;
        transform: rotate(45deg);
        transition: transform .3s;
        position: relative;
        top: 10px;
    }

    .AngleRight-Dropped {
        transform: rotate(135deg);
    }
</style>