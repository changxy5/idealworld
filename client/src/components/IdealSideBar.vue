<template>
    <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <!-- <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
        /> -->
      </n-layout-sider>
      <n-layout>
        <!-- 插槽：主要内容 -->
        <slot name='default'>
          <router-view></router-view>
        </slot>
        <br/>
        <!-- 插槽：footer -->
        <slot name='footer'></slot>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script>
import { h, ref} from "vue";
import {RouterLink} from 'vue-router'
import { NIcon } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";

const sideOptions = [
  {
    label: "Js基础",
    key: "js基础",
    href: "/"
  },
  {
    label: "JS API",
    key: "JS API",
    children: [
      {
        label: "JS BOM",
        key: "bom"
      },
      {
        label: "JS DOM",
        key: "dom"
      },
    ]
  },
  {
    label: "Vue2",
    key: "Vue2",
  },
  {
    label: "文章管理",
    key: "upload",
    href:'/login'
  },
  {
    label: "分类管理",
    key: "category"
  }
];

export default {
  name:'IdealSideBar',
   setup() {
    return {
      activeKey: ref(null),
      collapsed: false,
      sideOptions,
      renderMenuLabel(option) {
        if ("href" in option) {
          return h(
            // 渲染为路由组件
            RouterLink,
            { to: option.href},
            option.label
          );
        }
        return option.label;
      },
      renderMenuIcon(option) {
        if (option.key === "sheep-man")
          return true;
        if (option.key === "food")
          return null;
        return h(NIcon, null, { default: () => h(BookmarkOutline) });
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      }
    };
  }
}
</script>

<style>
</style>