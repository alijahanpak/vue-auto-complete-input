# vue-auto-complete-input

## Install
```
$ npm install --save vue-auto-complete-input
```

Register the component : 
```
import vueAutoCompleteInput from "vue-auto-complete-input";
import 'vue-auto-complete-input/dist/vue-auto-complete-input.css';
```
### How to use : 
```html
<label>Lable
    <vueAutoCompleteInput
            style="height: 150px"
            :name="'description'"
            :options = "[{'id':'', 'text' : ''}]"
            v-model="input.description">
    </vueAutoCompleteInput>
</label>
```
### props:

| Name          | Type            | Description  
| ------------- |---------------  |------------:
| option        | Array of object | Option list
| name          | String          | textarea name attribute

### v-validate:

```html
<label>Lable
    <vueAutoCompleteInput
            style="height: 150px"
            :name="'description'"
            v-validate="'required'"
            :class="{'input': true, 'error-border': errors.has('description')}"
            :options = "[{'id':'', 'text' : ''}]"
            v-model="input.description">
    </vueAutoCompleteInput>
    <span v-show="errors.has('description')" class="error-font">Error Text!</span>
</label>
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
