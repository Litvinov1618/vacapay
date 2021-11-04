<script>
    import { Router, Route } from 'svelte-navigator'
    import Home from './Home.svelte'
    import EmployeeForm from './EmployeeForm.svelte'
</script>

<Router>
    <div>
        <Route path="/" component={Home} />
        <Route path="addEmployee" component={EmployeeForm} />
    </div>
</Router>
