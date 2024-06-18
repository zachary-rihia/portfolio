# portfolio
Portfolio for jobs

### Issues I have come across:
If you install all the dependentcies you will come across this issue.

![image](https://github.com/zachary-rihia/portfolio/assets/83677402/21265044-bb1b-47af-826f-517cca236fae)

To fix this you will need to go the the file ` node_modules\@react-three\postprocessing\dist\effects\Texture.js ` and delete the `sRGBEncoding` import,

![image](https://github.com/zachary-rihia/portfolio/assets/83677402/6c0c1d03-f744-4f90-a519-aff987bb4fb7)

and replace the usage of it with `THREE.sRGBEncoding`.

![image](https://github.com/zachary-rihia/portfolio/assets/83677402/09545131-d8fd-4a26-b1ac-9065a9b5a20c)

ShaderPass and RenderPass from `@react-three\postprocessing` does not exist.




### Assests

- [Bookcase](https://www.blenderkit.com/get-blenderkit/493ffb8d-24b6-488c-a977-b70929287ce2/)
- [Chair](https://www.blenderkit.com/get-blenderkit/50fd6cc2-418d-468e-a002-d74650259470/)
- [Coffee](https://www.blenderkit.com/get-blenderkit/8b1d81c8-57b7-45ed-b427-4c43ca300dd7/)
- [FirePlace](https://www.blenderkit.com/get-blenderkit/e5c873f2-3b92-4704-b339-ca58997365f5/)
- [Table](https://www.blenderkit.com/get-blenderkit/9d6e6e2e-94c7-4fe4-89f4-a4edbeb6446f/)
- [Ceiling light](https://www.blenderkit.com/get-blenderkit/f8a9cc57-aaa6-448e-9d8d-8e56b3fd3ca1/)
- [Books](https://www.blenderkit.com/get-blenderkit/f8123f8a-c689-447d-89e3-8cc8e5f03703/)


