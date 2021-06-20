<template>
    <div>
		<tags-input v-model="tags"></tags-input>
        <pre><code>{{content}}</code></pre>
    </div>
</template>

<script>
import TagsInput from '../../../src/tags-input/tags-input';
export default {
    components: {
        TagsInput
    },
    data() {
        return {
            tags: ['111', '222', '333', '尤水就下'],
            content: `
                <tags-input v-model="tags"></tags-input>
            `.replace(/\t+| +/g, '').trim()
        }
    }
}
</script>
