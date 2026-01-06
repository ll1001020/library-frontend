<template>
  <el-popover trigger="focus" :width="900">
    <template #reference>
      <el-button style="width: 160px" :icon="props.modelValue">{{ modelValue }}</el-button>
    </template>
    <div class="el-icon-picker">
      <component v-for="icon in props.fatherIcon" :key="icon.value"
                 :class="[icon.value, 'icon', { 'icon-active': icon.value == props.modelValue }]"
                 :is="icon.value"
                 @click="emits('update:modelValue', icon.value)">
      </component>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
interface Props {
  modelValue: string,
  fatherIcon: any[]
}
const props = defineProps<Props>();
console.log(props)
const emits = defineEmits(['update:modelValue']);
</script>
<style scoped>
  *{
    margin: 0px;
    padding: 0px;
  }
.el-icon-picker {
  min-height: 20px;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
}
.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  color: var(--el-text-color-regular);
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  line-height: 45px;
  margin: 5px;
}
.icon:hover {
  color: var(--el-color-primary);
}
.icon-active {
  color: var(--el-color-primary);
}
</style>