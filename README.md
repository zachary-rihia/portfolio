# portfolio
Portfolio for jobs

### Issues I have come across:
- If you install all the dependentcies you will come across this issue.
![image](https://github.com/zachary-rihia/portfolio/assets/83677402/21265044-bb1b-47af-826f-517cca236fae)

To fix this you will need to go the the file ` node_modules\@react-three\postprocessing\dist\effects\Texture.js ` and delete the `sRGBEncoding` import,

![image](https://github.com/zachary-rihia/portfolio/assets/83677402/6c0c1d03-f744-4f90-a519-aff987bb4fb7)

and replace the usage of it with `THREE.sRGBEncoding`.

![image](https://github.com/zachary-rihia/portfolio/assets/83677402/09545131-d8fd-4a26-b1ac-9065a9b5a20c)
