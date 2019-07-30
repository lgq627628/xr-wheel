<template>
    <div>
		<xr-button>点我呀</xr-button>
		<xr-button icon="setting" icon-pos="right">点我呀</xr-button>
		<xr-button icon="loading">点我呀</xr-button>
        <pre><code>{{content}}</code></pre>
    </div>
</template>

<script>
import XrButton from '../../../src/button';
export default {
    components: {
        XrButton
    },
    data() {
        return {
            content: `
                <xr-button>点我呀</xr-button>
                <xr-button icon="setting" icon-pos="right">点我呀</xr-button>
                <xr-button icon="loading">点我呀</xr-button>
            `.replace(/\t+| +/g, '').trim()
        }
    }
}
</script>
