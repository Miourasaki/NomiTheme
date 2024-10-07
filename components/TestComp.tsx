// components/MyComponent.tsx
import { defineComponent, ref } from 'vue';

const TestComp = defineComponent({
    name: 'TestComp',
    props: {
        msg: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const count = ref(0);

        const increment = () => {
            count.value++;
        };

        return () => (
            <div>
                <h1>{props.msg}</h1>
                <p>Count: {count.value}</p>
                <button onClick={increment}>Increment</button>
            </div>
        );
    },
});

export default TestComp;
