const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');
/**
 * 针对antd实现按需打包： 根据import来打包
 */
module.exports = {
    babel: {
        plugins: [
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": true //设置为true即是less
                },
            ]
        ]
    },
    plugins: [
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                modifyVars: {
                    'primary-color': '#1DA57A'
                },
                javascriptEnabled: true,
              },
            },
          },
        },
      ]
}

