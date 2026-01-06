<template>
    <div class="root">
        <div style="max-width: 1200px;margin: auto;display: flex;position: relative;">
            <div style="display: flex;flex-direction: column;gap: 10px;margin-top: 20px;">
                <div class="Display">
                    <p>联系我们：</p>
                </div>
                <div class="Display" style="font-size: medium;">
                    <p>邮编：4222222</p>
                    <p>地址：翻斗大街翻斗花园2号楼1001室</p>
                    <p>服务咨询电话：4006006988、（+86 10）88545426</p>
                    <p>E-mail：webmaster@nlc.cn</p>
                </div>
            </div>
            <div style="display: flex;flex-direction: column;margin-left: 220px;gap: 10px;margin-top: 20px;">
                <div class="Display">
                    <p>友情链接：</p>
                </div>
                <div class="Display">
                    <p><a href="https://www.ccdy.cn/" target="_blank">中国文化传媒网</a></p>
                    <p><a href="https://www.lsc.org.cn/" target="_blank">中国图书馆学会</a></p>
                    <p><a href="http://www.nlcpress.com/" target="_blank">国家图书馆出版社</a></p>
                    <p><a href="https://www.culturedc.cn/web2.1/index.html" target="_blank">国家公共文化云</a></p>
                    <p><a href="http://www.chinaabp.cn/" target="_blank">中国古籍保护协会</a></p>
                </div>
            </div>
            <p style="position: absolute;bottom: -50px;left: 450px;color: white;">© 砺行线上数字图书馆版权所有</p>
        </div>


    </div>
</template>

<script setup lang='ts'>

</script>

<style>
* {
    margin: 0px;
    padding: 0px;
    text-decoration: none;
    list-style: none;
}

.root {
    
    width: 100%;
    height: 280px;
    background-color: rgb(54, 153, 170);
}

.Display {
    color: white;
    font-size: large;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 90px;
}

.Display a {
    color: white;
    font-size: medium;
}
</style>