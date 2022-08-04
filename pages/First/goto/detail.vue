<template>
	<view v-if="content.length>0">
	        <nodeCom :id="id" :imageUrl="this.$api.SERVER_BASE+imageUrl" :title="title" :auth="auth" :content="content"></nodeCom>
	    </view>

</template>

<script>
	import api from '../../../common/apiUtil.js';
	import nodeCom from '../../../components/nodeComponent.vue'
	    export default {
	        components: {
	            nodeCom
	        },
	        data() {
	            return {
	                id: 0,
	                imageUrl: '',
	                title: '',
	                auth: '',
	                content: ''
	            }
	        },
	        onLoad(options) {
	            this.getDetails(options.id)
	        },
	        methods: {
	            getDetails(id) {
	                this.$u.get(api.PURPOSE_DETAIL+id).then(res => {
	                    if(res.code == 200) {
	                        this.id = res.data.id;
	                        this.imageUrl = res.data.coverUrl;
	                        this.auth = res.data.author;
	                        this.title = res.data.title;
	                        this.content = res.data.content;
	                    }
	                })
	            }
	        }
	    }

</script>

<style>

</style>
