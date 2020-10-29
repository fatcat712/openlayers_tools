import Vue from 'vue';
//遍历配置目录中的文件，自动导入所有以custom-开头的公共组件文件，不需要显示一个个import了
function AutomaticImport() {
    const requireComponent = require.context(
        // 其组件目录的相对路径
        '@/components/common',
        // 是否查询其子目录
        false,
        // 匹配以custom-开头的基础组件文件名的正则表达式
        /custom-[\w-]+\.vue$/
    )

    requireComponent.keys().forEach(fileName => {
        const componentConfig = requireComponent(fileName);
        // Get the PascalCase version of the component name
        const componentName = fileName
            // Remove the "./_" from the beginning
            .replace(/^\.\//, '')
            // Remove the file extension from the end
            .replace(/\.\w+$/, '')
            // Split up kebabs
            .split('-')
            // Upper case
            .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
            // Concatenated
            .join('')

        console.log(componentName);
        // 全局注册组件
        Vue.component(
            componentName,
            // 如果这个组件选项是通过 `export default` 导出的，
            // 那么就会优先使用 `.default`，
            // 否则回退到使用模块的根。
            componentConfig.default || componentConfig
        )
    })
}

export {
    AutomaticImport
}