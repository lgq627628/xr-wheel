<template>
    <div>
		<xr-button-group>
			<xr-button icon="left">上一页</xr-button>
			<xr-button >中间</xr-button>
			<xr-button icon="right" icon-pos="right">下一页</xr-button>
		</xr-button-group>
        <pre><code>{{content}}</code></pre>
    </div>
</template>

<script>
import XrButton from '../../../src/button';
import XrButtonGroup from '../../../src/button-group';
export default {
    components: {
        XrButton,
        XrButtonGroup
    },
    data() {
        return {
            content: `
                <xr-button-group>
                    <xr-button icon="left">上一页</xr-button>
                    <xr-button >中间</xr-button>
                    <xr-button icon="right" icon-pos="right">下一页</xr-button>
                </xr-button-group>
            `.replace(/\t+| +/g, '').trim()
        }
    }
}
</script>
