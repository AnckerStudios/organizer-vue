<template lang="">
    <button class="bg-gradient-to-r from-sky-400 to-blue-800 w-full h-10 rounded-full p-1 group text-white text-xl font-bold">
        <div class="group-hover:bg-white bg-transparent h-full rounded-full p-1 transition-all flex items-center justify-center">
            
            <span class="text-white bg-gradient-to-b from-sky-400 to-blue-800 bg-clip-text 
            group-hover:text-transparent transition-all flex justify-center items-center gap-2"><slot></slot></span>
        </div>
    </button>
</template>
<script>
export default {
    
}
</script>