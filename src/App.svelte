<script>
    import { Router, Route, Link } from 'svelte-navigator'
    import Home from './Home.svelte'
    import EmployeeForm from './EmployeeForm.svelte'
    import VacationCalendar from './VacationCalendar.svelte'
</script>

    <Router>
        <Route path="/">
            <Home />
        </Route>
        <Route path="/addEmployee">
            <EmployeeForm />
        </Route>
    </Router>


