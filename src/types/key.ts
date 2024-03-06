import { InjectionKey, Ref } from 'vue';
import { ColorPicker } from '../components';

export const colorPickerKey: InjectionKey<Ref<InstanceType<typeof ColorPicker>|null>> = Symbol();