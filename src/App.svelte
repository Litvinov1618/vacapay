<script>
    import { Router, Route } from 'svelte-navigator'
    import Modal from 'svelte-simple-modal'
    import Home from './Home.svelte'
    import EmployeeForm from './EmployeeForm.svelte'
</script>

<Modal>
    <Router basepath={location.pathname}>
        <div>
            <Route path="/" component={Home} />
            <Route path="/addEmployee" component={EmployeeForm} />
        </div>
    </Router>
</Modal>
