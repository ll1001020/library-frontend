<template>
    <Header style="margin-bottom: 20px;"></Header>
    <router-view></router-view>
    <Footer style="margin-top: 20px;"></Footer>
    <Chat/>
</template>
    
<script setup lang='ts'>
    import Header from './header/Header.vue';
    import Footer from './footer/Footer.vue';
    import Chat from './chat/Chat.vue'
</script>
    
<style>
    
</style>