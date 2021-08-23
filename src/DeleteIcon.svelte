<div class="DeleteIcon" />

<style>
    .DeleteIcon {
        width: 15px;
        height: 15px;
        position: relative;
        border-radius: 15px;
    }

    .DeleteIcon:after {
        content: '';
        height: 15px;
        border-left: 1px solid rgb(168, 167, 167);
        position: absolute;
        transform: rotate(45deg);
        left: 7px;
    }

    .DeleteIcon:before {
        content: '';
        height: 15px;
        border-left: 1px solid rgb(168, 167, 167);
        position: absolute;
        transform: rotate(-45deg);
        left: 7px;
    }
</style>