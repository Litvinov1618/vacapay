
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.41.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/AngleRightIcon.svelte generated by Svelte v3.41.0 */

    const file$6 = "src/AngleRightIcon.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(`AngleRight ${/*isDropped*/ ctx[0] ? 'AngleRight-Dropped' : ''}`) + " svelte-1wcudu9"));
    			add_location(div, file$6, 3, 0, 51);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*isDropped*/ 1 && div_class_value !== (div_class_value = "" + (null_to_empty(`AngleRight ${/*isDropped*/ ctx[0] ? 'AngleRight-Dropped' : ''}`) + " svelte-1wcudu9"))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AngleRightIcon', slots, []);
    	let { isDropped } = $$props;
    	const writable_props = ['isDropped'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AngleRightIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('isDropped' in $$props) $$invalidate(0, isDropped = $$props.isDropped);
    	};

    	$$self.$capture_state = () => ({ isDropped });

    	$$self.$inject_state = $$props => {
    		if ('isDropped' in $$props) $$invalidate(0, isDropped = $$props.isDropped);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isDropped];
    }

    class AngleRightIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { isDropped: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AngleRightIcon",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*isDropped*/ ctx[0] === undefined && !('isDropped' in props)) {
    			console.warn("<AngleRightIcon> was created without expected prop 'isDropped'");
    		}
    	}

    	get isDropped() {
    		throw new Error("<AngleRightIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isDropped(value) {
    		throw new Error("<AngleRightIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/TrashIcon.svelte generated by Svelte v3.41.0 */

    const file$5 = "src/TrashIcon.svelte";

    function create_fragment$5(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let path2;
    	let path3;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			path3 = svg_element("path");
    			attr_dev(path0, "d", "m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0");
    			add_location(path0, file$5, 1, 4, 117);
    			attr_dev(path1, "d", "m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0");
    			add_location(path1, file$5, 2, 4, 287);
    			attr_dev(path2, "d", "m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0");
    			add_location(path2, file$5, 3, 4, 457);
    			attr_dev(path3, "d", "m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0");
    			add_location(path3, file$5, 4, 4, 1786);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "height", "15pt");
    			attr_dev(svg, "viewBox", "-40 0 427 427.00131");
    			attr_dev(svg, "width", "15pt");
    			attr_dev(svg, "fill", "#bd1515");
    			add_location(svg, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    			append_dev(svg, path3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TrashIcon', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TrashIcon> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class TrashIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TrashIcon",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const mockedEmployeeList = [
        {
            name: 'Давиденко Іван Олександрович',
            position: 'Вчитель української мови та літератури',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Монько Ніна Дмитрівна',
            position: 'Вчитель російської мови та літератури"',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Касярум Тетяна Володимирівна',
            position: 'Вчитель української мови та літератури',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Біла Тетяна Петрівна',
            position: 'Вчитель української мови та літератури',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Легка Юлія Миколаївна',
            position: 'Вчитель інформатики',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Дятлова Олена Анатоліївна',
            position: 'Вчитель',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Прохач Валентина Федорівна',
            position: 'Вчитель математики',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Калмикова Вікторія Валеріївна',
            position: 'Вчитель математики',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Уманська Тетяна Миколаївна',
            position: 'Вчитель фізики',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Лазарєва Тетяна Петрівна',
            position: 'Вчитель хімії',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Іголкіна Яна В’ячеславівна',
            position: 'Вчитель біології',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Цьомко Віта Степанівна',
            position: 'Вчитель історії',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Трубчанінова Тетяна Петрівна',
            position: 'Вчитель географії',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Григор’єв Артем Сергійович',
            position: 'Вчитель фізичної культури',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Морозова Тетяна Михайлівна',
            position: 'Методист з профорієнтації',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 42,
                    totalDays: 42,
                },
            ],
        },
        {
            name: 'Перерва Світлана Вікторівна',
            position: 'Вчитель інформатики',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Щербина Ярослава Анатоліївна',
            position: 'Вчитель історії',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Вовк Ольга Вікторівна',
            position: 'Вчитель англійської мови',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Мазур Інна Сергіївна',
            position: 'Вчитель англійської мови',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Біда Юля Петрівна',
            position: 'Вчитель української мови та літератури',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Зайдуліна Вікторія Вікторівна',
            position: 'Вчитель англійської мови',
            employeeType: 'Вчитель',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                },
            ],
        },
        {
            name: 'Мятович Ірина Володимирівна',
            position: 'Директор',
            employeeType: 'Адміністрація',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                }
            ],
        },
        {
            name: 'Смьордова Ольга Володимирівна',
            position: 'Заступник директора з НВР',
            employeeType: 'Адміністрація',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                }
            ],
        },
        {
            name: 'Бабаніна Ольга Петрівна',
            position: 'Заступник директора з НВР',
            employeeType: 'Адміністрація',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                }
            ],
        },
        {
            name: 'Дем’яник Олена Геннадіївна',
            position: 'Заступник директора з ВР',
            employeeType: 'Адміністрація',
            vacations: [
                {
                    type: 'Основна',
                    isPaid: true,
                    vacationDays: 56,
                    totalDays: 56,
                }
            ],
        },
        {
            name: 'Оріян Анастасія Олександрівна',
            position: 'Практичний психолог',
            employeeType: 'Допоміжний персонал',
            vacations: [
                {
                    totalDays: 56,
                    vacationDays: 56,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Качан Анастасія Романівна',
            position: 'Соціальний педагог',
            employeeType: 'Допоміжний персонал',
            vacations: [
                {
                    totalDays: 56,
                    vacationDays: 56,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Петрова Віра Вікторівна',
            position: 'Завідуюча господарством',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 31,
                    vacationDays: 31,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Школа Наталія Миколаївна',
            position: 'Інспектор з кадрів та діловодства',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 31,
                    vacationDays: 31,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Сухар Ольга Іванівна',
            position: 'Інженер з охорони праці',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 31,
                    vacationDays: 31,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Дузенко Яна Олегівна',
            position: 'Інженер-електронік',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 31,
                    vacationDays: 31,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Казаков Сергій Геннадійович',
            position: 'Робітник',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Порошина Марина Василівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Петрухіна Людмила Іванівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Олійник Тетяна Олександрівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Кодиця Валентина Іванівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Бондаренко Наталія Олександрівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Сагайдачна Валентина Олексіївна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Назаренко Юрій Михайлович',
            position: 'Сторож',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Дубогрій Анатолій Іванович',
            position: 'Сторож',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Чорний Костянтин Григорович',
            position: 'Сторож',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Пічуєва Марина Іванівна',
            position: 'Медична сестра',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Волошина Олена Леонідівна',
            position: 'Бібліотекар',
            employeeType: 'Технічний персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Казаков Сергій Геннадійович',
            position: 'Робітник',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Порошина Марина Василівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Петрухіна Людмила Іванівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Олійник Тетяна Олександрівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Кодиця Валентина Іванівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Бондаренко Наталія Олександрівна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Сагайдачна Валентина Олексіївна',
            position: 'Прибиральниця службових приміщень',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Назаренко Юрій Михайлович',
            position: 'Сторож',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Дубогрій Анатолій Іванович',
            position: 'Сторож',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
        {
            name: 'Чорний Костянтин Григорович',
            position: 'Сторож',
            employeeType: 'Обслуговуючий персонал',
            vacations: [
                {
                    totalDays: 24,
                    vacationDays: 24,
                    isPaid: true,
                    type: 'Основна',
                },
            ],
        },
    ];

    const createEmployeeList = () => {
        const { subscribe, update } = writable(mockedEmployeeList);
        return {
            subscribe,
            removeEmployee: (employeeToRemove) => update(employeeList => employeeList.filter(employee => JSON.stringify(employee) !== JSON.stringify(employeeToRemove))),
            changeEmployeeInfo: (employeeToChange, newEmployeeInfo) => update(employeeList => employeeList.map(employee => {
                if (JSON.stringify(employee) === JSON.stringify(employeeToChange)) {
                    return newEmployeeInfo;
                }
                return employee;
            })),
            changeEmployeeVacationDays: (selectedEmployee, selectedVacation, daysToDeduct) => update(employeeList => employeeList.map(employee => {
                if (JSON.stringify(employee) !== JSON.stringify(selectedEmployee))
                    return employee;
                return Object.assign(Object.assign({}, employee), { vacations: employee.vacations.map(vacation => {
                        if (vacation.type !== selectedVacation.type)
                            return vacation;
                        return Object.assign(Object.assign({}, vacation), { vacationDays: vacation.vacationDays - daysToDeduct });
                    }) });
            })),
            changeEmployeeTotalVacationDays: (selectedEmployee, selectedVacation, newTotalVacationDays) => update(employeeList => employeeList.map(employee => {
                if (JSON.stringify(employee) !== JSON.stringify(selectedEmployee))
                    return employee;
                return Object.assign(Object.assign({}, employee), { vacations: employee.vacations.map(vacation => {
                        if (vacation.type !== selectedVacation.type)
                            return vacation;
                        return Object.assign(Object.assign({}, vacation), { totalDays: newTotalVacationDays, vacationDays: newTotalVacationDays });
                    }) });
            })),
            addEmployee: (employeeToAdd) => update(employeeList => [...employeeList, employeeToAdd]),
            addVacationsGroup: (selectedEmployee, newVacationsGroup) => update(employeeList => {
                const newEmployeeList = [...employeeList];
                newEmployeeList
                    .find(employee => JSON.stringify(employee) === JSON.stringify(selectedEmployee))
                    .vacations.push(newVacationsGroup);
                return newEmployeeList;
            }),
        };
    };
    const employeeList = createEmployeeList();
    const employeeTypes = derived(employeeList, $employeeList => {
        const employeeTypes = [];
        $employeeList
            .map(employee => !employeeTypes.includes(employee.employeeType) && employeeTypes.push(employee.employeeType));
        return employeeTypes;
    });

    /* src/AddVacationsGroupForm.svelte generated by Svelte v3.41.0 */
    const file$4 = "src/AddVacationsGroupForm.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    // (24:0) {#if !isAddVacationGroupFormShown}
    function create_if_block_1$1(ctx) {
    	let div;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			button.textContent = "Додати новий тип відпустки";
    			add_location(button, file$4, 25, 8, 623);
    			add_location(div, file$4, 24, 4, 609);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(24:0) {#if !isAddVacationGroupFormShown}",
    		ctx
    	});

    	return block;
    }

    // (29:0) {#if isAddVacationGroupFormShown}
    function create_if_block$2(ctx) {
    	let form;
    	let select;
    	let t0;
    	let input0;
    	let t1;
    	let label;
    	let input1;
    	let t2;
    	let t3;
    	let div;
    	let button;
    	let mounted;
    	let dispose;
    	let each_value = /*vacationTypes*/ ctx[4];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			form = element("form");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			input0 = element("input");
    			t1 = space();
    			label = element("label");
    			input1 = element("input");
    			t2 = text("\n            Оплачувана");
    			t3 = space();
    			div = element("div");
    			button = element("button");
    			button.textContent = "Додати";
    			if (/*vacationType*/ ctx[3] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[8].call(select));
    			add_location(select, file$4, 30, 8, 862);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "placeholder", "Кількість днів");
    			add_location(input0, file$4, 35, 8, 1038);
    			attr_dev(input1, "type", "checkbox");
    			add_location(input1, file$4, 37, 12, 1165);
    			set_style(label, "display", "inline");
    			add_location(label, file$4, 36, 8, 1120);
    			attr_dev(button, "type", "submit");
    			add_location(button, file$4, 41, 12, 1277);
    			add_location(div, file$4, 40, 8, 1259);
    			attr_dev(form, "action", "submit");
    			add_location(form, file$4, 29, 4, 774);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*vacationType*/ ctx[3]);
    			append_dev(form, t0);
    			append_dev(form, input0);
    			set_input_value(input0, /*totalDays*/ ctx[1]);
    			append_dev(form, t1);
    			append_dev(form, label);
    			append_dev(label, input1);
    			input1.checked = /*isPaid*/ ctx[2];
    			append_dev(label, t2);
    			append_dev(form, t3);
    			append_dev(form, div);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[8]),
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[9]),
    					listen_dev(input1, "change", /*input1_change_handler*/ ctx[10]),
    					listen_dev(form, "submit", prevent_default(/*handleNewVacationsGroupSubmit*/ ctx[5]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*vacationTypes*/ 16) {
    				each_value = /*vacationTypes*/ ctx[4];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*vacationType, vacationTypes*/ 24) {
    				select_option(select, /*vacationType*/ ctx[3]);
    			}

    			if (dirty & /*totalDays*/ 2 && to_number(input0.value) !== /*totalDays*/ ctx[1]) {
    				set_input_value(input0, /*totalDays*/ ctx[1]);
    			}

    			if (dirty & /*isPaid*/ 4) {
    				input1.checked = /*isPaid*/ ctx[2];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(29:0) {#if isAddVacationGroupFormShown}",
    		ctx
    	});

    	return block;
    }

    // (32:12) {#each vacationTypes as type}
    function create_each_block$3(ctx) {
    	let option;
    	let t_value = /*type*/ ctx[11] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*type*/ ctx[11];
    			option.value = option.__value;
    			add_location(option, file$4, 32, 16, 955);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(32:12) {#each vacationTypes as type}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let t;
    	let if_block1_anchor;
    	let if_block0 = !/*isAddVacationGroupFormShown*/ ctx[0] && create_if_block_1$1(ctx);
    	let if_block1 = /*isAddVacationGroupFormShown*/ ctx[0] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*isAddVacationGroupFormShown*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(t.parentNode, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*isAddVacationGroupFormShown*/ ctx[0]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AddVacationsGroupForm', slots, []);
    	let { employee } = $$props;
    	

    	const vacationTypes = [
    		'Основна',
    		'За особливий характер праці',
    		'Соціальна',
    		'За бажанням працівника',
    		'За згодою сторін'
    	];

    	let isAddVacationGroupFormShown = false;
    	let totalDays, isPaid, vacationType;

    	const handleNewVacationsGroupSubmit = () => {
    		employeeList.addVacationsGroup(employee, {
    			isPaid: !!isPaid,
    			type: vacationType,
    			vacationDays: totalDays,
    			totalDays
    		});

    		$$invalidate(0, isAddVacationGroupFormShown = false);
    	};

    	const writable_props = ['employee'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AddVacationsGroupForm> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, isAddVacationGroupFormShown = true);

    	function select_change_handler() {
    		vacationType = select_value(this);
    		$$invalidate(3, vacationType);
    		$$invalidate(4, vacationTypes);
    	}

    	function input0_input_handler() {
    		totalDays = to_number(this.value);
    		$$invalidate(1, totalDays);
    	}

    	function input1_change_handler() {
    		isPaid = this.checked;
    		$$invalidate(2, isPaid);
    	}

    	$$self.$$set = $$props => {
    		if ('employee' in $$props) $$invalidate(6, employee = $$props.employee);
    	};

    	$$self.$capture_state = () => ({
    		employee,
    		employeeList,
    		vacationTypes,
    		isAddVacationGroupFormShown,
    		totalDays,
    		isPaid,
    		vacationType,
    		handleNewVacationsGroupSubmit
    	});

    	$$self.$inject_state = $$props => {
    		if ('employee' in $$props) $$invalidate(6, employee = $$props.employee);
    		if ('isAddVacationGroupFormShown' in $$props) $$invalidate(0, isAddVacationGroupFormShown = $$props.isAddVacationGroupFormShown);
    		if ('totalDays' in $$props) $$invalidate(1, totalDays = $$props.totalDays);
    		if ('isPaid' in $$props) $$invalidate(2, isPaid = $$props.isPaid);
    		if ('vacationType' in $$props) $$invalidate(3, vacationType = $$props.vacationType);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isAddVacationGroupFormShown,
    		totalDays,
    		isPaid,
    		vacationType,
    		vacationTypes,
    		handleNewVacationsGroupSubmit,
    		employee,
    		click_handler,
    		select_change_handler,
    		input0_input_handler,
    		input1_change_handler
    	];
    }

    class AddVacationsGroupForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { employee: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddVacationsGroupForm",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*employee*/ ctx[6] === undefined && !('employee' in props)) {
    			console.warn("<AddVacationsGroupForm> was created without expected prop 'employee'");
    		}
    	}

    	get employee() {
    		throw new Error("<AddVacationsGroupForm>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set employee(value) {
    		throw new Error("<AddVacationsGroupForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Vacations.svelte generated by Svelte v3.41.0 */
    const file$3 = "src/Vacations.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (37:12) {:else}
    function create_else_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("(Неоплачувана)");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(37:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (35:8) {#if vacation.isPaid}
    function create_if_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("(Оплачувана)");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(35:8) {#if vacation.isPaid}",
    		ctx
    	});

    	return block;
    }

    // (32:0) {#each employee.vacations as vacation (Math.floor(Math.random() * 1000))}
    function create_each_block$2(key_1, ctx) {
    	let div;
    	let b;
    	let t0_value = /*vacation*/ ctx[7].type + "";
    	let t0;
    	let t1;
    	let t2_value = /*vacation*/ ctx[7].vacationDays + "";
    	let t2;
    	let t3;
    	let t4_value = /*vacation*/ ctx[7].totalDays + "";
    	let t4;
    	let t5;
    	let t6;
    	let button;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*vacation*/ ctx[7].isPaid) return create_if_block$1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	function click_handler() {
    		return /*click_handler*/ ctx[3](/*vacation*/ ctx[7]);
    	}

    	function dblclick_handler() {
    		return /*dblclick_handler*/ ctx[4](/*vacation*/ ctx[7]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			b = element("b");
    			t0 = text(t0_value);
    			t1 = text(": ");
    			t2 = text(t2_value);
    			t3 = text(" з ");
    			t4 = text(t4_value);
    			t5 = text(" днів\n        ");
    			if_block.c();
    			t6 = space();
    			button = element("button");
    			button.textContent = "Відняти відпускні";
    			add_location(b, file$3, 33, 8, 1480);
    			add_location(button, file$3, 39, 8, 1680);
    			add_location(div, file$3, 32, 4, 1406);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, b);
    			append_dev(b, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    			append_dev(div, t3);
    			append_dev(div, t4);
    			append_dev(div, t5);
    			if_block.m(div, null);
    			append_dev(div, t6);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", click_handler, false, false, false),
    					listen_dev(div, "dblclick", dblclick_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*employee*/ 1 && t0_value !== (t0_value = /*vacation*/ ctx[7].type + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*employee*/ 1 && t2_value !== (t2_value = /*vacation*/ ctx[7].vacationDays + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*employee*/ 1 && t4_value !== (t4_value = /*vacation*/ ctx[7].totalDays + "")) set_data_dev(t4, t4_value);

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, t6);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(32:0) {#each employee.vacations as vacation (Math.floor(Math.random() * 1000))}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t;
    	let addvacationsgroupform;
    	let current;
    	let each_value = /*employee*/ ctx[0].vacations;
    	validate_each_argument(each_value);
    	const get_key = ctx => Math.floor(Math.random() * 1000);
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key();
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	addvacationsgroupform = new AddVacationsGroupForm({
    			props: { employee: /*employee*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			create_component(addvacationsgroupform.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t, anchor);
    			mount_component(addvacationsgroupform, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*handleTotalVacationDaysChange, employee, deductVacationPay*/ 7) {
    				each_value = /*employee*/ ctx[0].vacations;
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, t.parentNode, destroy_block, create_each_block$2, t, get_each_context$2);
    			}

    			const addvacationsgroupform_changes = {};
    			if (dirty & /*employee*/ 1) addvacationsgroupform_changes.employee = /*employee*/ ctx[0];
    			addvacationsgroupform.$set(addvacationsgroupform_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(addvacationsgroupform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(addvacationsgroupform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(t);
    			destroy_component(addvacationsgroupform, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Vacations', slots, []);
    	
    	let { employee } = $$props;
    	const { changeEmployeeTotalVacationDays, changeEmployeeVacationDays } = employeeList;

    	const handleTotalVacationDaysChange = vacation => {
    		const newTotalVacationDays = prompt(vacation.type, vacation.totalDays.toLocaleString());
    		if (!newTotalVacationDays) return;

    		if (newTotalVacationDays === '' || isNaN(+newTotalVacationDays)) {
    			alert('Ви маєте передати число');
    			handleTotalVacationDaysChange(vacation);
    		}

    		changeEmployeeTotalVacationDays(employee, vacation, +newTotalVacationDays);
    	};

    	const deductVacationPay = (selectedEmployee, selectedVacation) => {
    		const daysToDeduct = window.prompt(`На скільки днів ${selectedEmployee.name} бере відпустку?`);
    		if (!daysToDeduct) return;

    		if (+daysToDeduct > selectedVacation.vacationDays) {
    			alert('Кільіксть днів більша допустимої');
    			deductVacationPay(selectedEmployee, selectedVacation);
    		}

    		if (daysToDeduct === '' || isNaN(+daysToDeduct)) {
    			alert('Ви маєте передати число');
    			deductVacationPay(selectedEmployee, selectedVacation);
    		}

    		changeEmployeeVacationDays(selectedEmployee, selectedVacation, +daysToDeduct);
    	};

    	const writable_props = ['employee'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Vacations> was created with unknown prop '${key}'`);
    	});

    	const click_handler = vacation => deductVacationPay(employee, vacation);
    	const dblclick_handler = vacation => handleTotalVacationDaysChange(vacation);

    	$$self.$$set = $$props => {
    		if ('employee' in $$props) $$invalidate(0, employee = $$props.employee);
    	};

    	$$self.$capture_state = () => ({
    		employeeList,
    		AddVacationsGroupForm,
    		employee,
    		changeEmployeeTotalVacationDays,
    		changeEmployeeVacationDays,
    		handleTotalVacationDaysChange,
    		deductVacationPay
    	});

    	$$self.$inject_state = $$props => {
    		if ('employee' in $$props) $$invalidate(0, employee = $$props.employee);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		employee,
    		handleTotalVacationDaysChange,
    		deductVacationPay,
    		click_handler,
    		dblclick_handler
    	];
    }

    class Vacations extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { employee: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Vacations",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*employee*/ ctx[0] === undefined && !('employee' in props)) {
    			console.warn("<Vacations> was created without expected prop 'employee'");
    		}
    	}

    	get employee() {
    		throw new Error("<Vacations>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set employee(value) {
    		throw new Error("<Vacations>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Employee.svelte generated by Svelte v3.41.0 */

    const { Object: Object_1 } = globals;
    const file$2 = "src/Employee.svelte";

    function create_fragment$2(ctx) {
    	let div6;
    	let div3;
    	let div2;
    	let div0;
    	let b0;
    	let t1;
    	let t2_value = /*employee*/ ctx[0].name + "";
    	let t2;
    	let t3;
    	let div1;
    	let b1;
    	let t5;
    	let t6_value = /*employee*/ ctx[0].position + "";
    	let t6;
    	let t7;
    	let anglerighticon;
    	let t8;
    	let div5;
    	let div4;
    	let b2;
    	let t10;
    	let t11;
    	let vacations;
    	let t12;
    	let button;
    	let trashicon;
    	let div5_hidden_value;
    	let current;
    	let mounted;
    	let dispose;

    	anglerighticon = new AngleRightIcon({
    			props: {
    				isDropped: /*isEmployeeContentOpened*/ ctx[1]
    			},
    			$$inline: true
    		});

    	vacations = new Vacations({
    			props: { employee: /*employee*/ ctx[0] },
    			$$inline: true
    		});

    	trashicon = new TrashIcon({ $$inline: true });

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			b0 = element("b");
    			b0.textContent = "ПІБ";
    			t1 = text(": ");
    			t2 = text(t2_value);
    			t3 = space();
    			div1 = element("div");
    			b1 = element("b");
    			b1.textContent = "Посада";
    			t5 = text(": ");
    			t6 = text(t6_value);
    			t7 = space();
    			create_component(anglerighticon.$$.fragment);
    			t8 = space();
    			div5 = element("div");
    			div4 = element("div");
    			b2 = element("b");
    			b2.textContent = "Відпустки";
    			t10 = text(":");
    			t11 = space();
    			create_component(vacations.$$.fragment);
    			t12 = space();
    			button = element("button");
    			create_component(trashicon.$$.fragment);
    			add_location(b0, file$2, 20, 62, 949);
    			add_location(div0, file$2, 20, 12, 899);
    			add_location(b1, file$2, 21, 66, 1049);
    			add_location(div1, file$2, 21, 12, 995);
    			attr_dev(div2, "class", "Employee-HeaderInfo svelte-1tdl515");
    			add_location(div2, file$2, 19, 8, 853);
    			attr_dev(div3, "class", "Employee-Header svelte-1tdl515");
    			add_location(div3, file$2, 18, 4, 747);
    			add_location(b2, file$2, 26, 46, 1296);
    			attr_dev(div4, "class", "Employee-VacationsHeader svelte-1tdl515");
    			add_location(div4, file$2, 26, 8, 1258);
    			attr_dev(button, "class", "Employee-Button svelte-1tdl515");
    			add_location(button, file$2, 28, 8, 1370);
    			div5.hidden = div5_hidden_value = !/*isEmployeeContentOpened*/ ctx[1];
    			attr_dev(div5, "class", "Employee-Vacations svelte-1tdl515");
    			add_location(div5, file$2, 25, 4, 1183);
    			attr_dev(div6, "class", "Employee svelte-1tdl515");
    			add_location(div6, file$2, 17, 0, 720);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, b0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, b1);
    			append_dev(div1, t5);
    			append_dev(div1, t6);
    			append_dev(div3, t7);
    			mount_component(anglerighticon, div3, null);
    			append_dev(div6, t8);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, b2);
    			append_dev(div4, t10);
    			append_dev(div5, t11);
    			mount_component(vacations, div5, null);
    			append_dev(div5, t12);
    			append_dev(div5, button);
    			mount_component(trashicon, button, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "dblclick", /*dblclick_handler*/ ctx[4], false, false, false),
    					listen_dev(div1, "dblclick", /*dblclick_handler_1*/ ctx[5], false, false, false),
    					listen_dev(div3, "click", /*click_handler*/ ctx[6], false, false, false),
    					listen_dev(button, "click", /*click_handler_1*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*employee*/ 1) && t2_value !== (t2_value = /*employee*/ ctx[0].name + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty & /*employee*/ 1) && t6_value !== (t6_value = /*employee*/ ctx[0].position + "")) set_data_dev(t6, t6_value);
    			const anglerighticon_changes = {};
    			if (dirty & /*isEmployeeContentOpened*/ 2) anglerighticon_changes.isDropped = /*isEmployeeContentOpened*/ ctx[1];
    			anglerighticon.$set(anglerighticon_changes);
    			const vacations_changes = {};
    			if (dirty & /*employee*/ 1) vacations_changes.employee = /*employee*/ ctx[0];
    			vacations.$set(vacations_changes);

    			if (!current || dirty & /*isEmployeeContentOpened*/ 2 && div5_hidden_value !== (div5_hidden_value = !/*isEmployeeContentOpened*/ ctx[1])) {
    				prop_dev(div5, "hidden", div5_hidden_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(anglerighticon.$$.fragment, local);
    			transition_in(vacations.$$.fragment, local);
    			transition_in(trashicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(anglerighticon.$$.fragment, local);
    			transition_out(vacations.$$.fragment, local);
    			transition_out(trashicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_component(anglerighticon);
    			destroy_component(vacations);
    			destroy_component(trashicon);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Employee', slots, []);
    	let { employee } = $$props;
    	
    	let isEmployeeContentOpened = false;
    	const { changeEmployeeInfo, removeEmployee } = employeeList;

    	const handleInfoChange = infoType => {
    		const isName = infoType === 'name';
    		const newInfo = prompt(isName ? 'ПІБ' : 'Посада', isName ? employee.name : employee.position);
    		if (!newInfo) return;

    		changeEmployeeInfo(employee, Object.assign(Object.assign({}, employee), {
    			name: isName ? newInfo : employee.name,
    			position: isName ? employee.position : newInfo
    		}));
    	};

    	const writable_props = ['employee'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Employee> was created with unknown prop '${key}'`);
    	});

    	const dblclick_handler = () => handleInfoChange('name');
    	const dblclick_handler_1 = () => handleInfoChange('position');
    	const click_handler = () => $$invalidate(1, isEmployeeContentOpened = !isEmployeeContentOpened);
    	const click_handler_1 = () => removeEmployee(employee);

    	$$self.$$set = $$props => {
    		if ('employee' in $$props) $$invalidate(0, employee = $$props.employee);
    	};

    	$$self.$capture_state = () => ({
    		employee,
    		AngleRightIcon,
    		TrashIcon,
    		Vacations,
    		employeeList,
    		isEmployeeContentOpened,
    		changeEmployeeInfo,
    		removeEmployee,
    		handleInfoChange
    	});

    	$$self.$inject_state = $$props => {
    		if ('employee' in $$props) $$invalidate(0, employee = $$props.employee);
    		if ('isEmployeeContentOpened' in $$props) $$invalidate(1, isEmployeeContentOpened = $$props.isEmployeeContentOpened);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		employee,
    		isEmployeeContentOpened,
    		removeEmployee,
    		handleInfoChange,
    		dblclick_handler,
    		dblclick_handler_1,
    		click_handler,
    		click_handler_1
    	];
    }

    class Employee extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { employee: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Employee",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*employee*/ ctx[0] === undefined && !('employee' in props)) {
    			console.warn("<Employee> was created without expected prop 'employee'");
    		}
    	}

    	get employee() {
    		throw new Error("<Employee>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set employee(value) {
    		throw new Error("<Employee>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/EmployeeForm.svelte generated by Svelte v3.41.0 */
    const file$1 = "src/EmployeeForm.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (35:12) {#each $employeeTypes as employeeType}
    function create_each_block$1(ctx) {
    	let option;
    	let t_value = /*employeeType*/ ctx[3] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*employeeType*/ ctx[3];
    			option.value = option.__value;
    			add_location(option, file$1, 35, 16, 1064);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$employeeTypes*/ 4 && t_value !== (t_value = /*employeeType*/ ctx[3] + "")) set_data_dev(t, t_value);

    			if (dirty & /*$employeeTypes*/ 4 && option_value_value !== (option_value_value = /*employeeType*/ ctx[3])) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(35:12) {#each $employeeTypes as employeeType}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let form;
    	let label0;
    	let t0;
    	let input0;
    	let t1;
    	let label1;
    	let t2;
    	let input1;
    	let t3;
    	let label2;
    	let t4;
    	let select;
    	let option;
    	let t5;
    	let button;
    	let mounted;
    	let dispose;
    	let each_value = /*$employeeTypes*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			form = element("form");
    			label0 = element("label");
    			t0 = text("ПІБ Працівника\n        ");
    			input0 = element("input");
    			t1 = space();
    			label1 = element("label");
    			t2 = text("Посада\n        ");
    			input1 = element("input");
    			t3 = space();
    			label2 = element("label");
    			t4 = text("Тип посади\n        ");
    			select = element("select");
    			option = element("option");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			button = element("button");
    			button.textContent = "Додати працівника до бази";
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "class", "EmployeeForm-Input svelte-39rn50");
    			input0.required = true;
    			add_location(input0, file$1, 14, 8, 442);
    			attr_dev(label0, "class", "EmployeeForm-Label svelte-39rn50");
    			add_location(label0, file$1, 12, 4, 376);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "EmployeeForm-Input svelte-39rn50");
    			input1.required = true;
    			add_location(input1, file$1, 23, 8, 648);
    			attr_dev(label1, "class", "EmployeeForm-Label svelte-39rn50");
    			add_location(label1, file$1, 21, 4, 590);
    			option.__value = "";
    			option.value = option.__value;
    			option.selected = true;
    			option.disabled = true;
    			option.hidden = true;
    			add_location(option, file$1, 33, 12, 945);
    			attr_dev(select, "class", "EmployeeForm-Input svelte-39rn50");
    			select.required = true;
    			if (/*employeeType*/ ctx[3] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[8].call(select));
    			add_location(select, file$1, 32, 8, 862);
    			attr_dev(label2, "class", "EmployeeForm-Label svelte-39rn50");
    			add_location(label2, file$1, 30, 4, 800);
    			attr_dev(button, "type", "submit");
    			add_location(button, file$1, 39, 4, 1172);
    			attr_dev(form, "action", "submit");
    			attr_dev(form, "class", "EmployeeForm svelte-39rn50");
    			add_location(form, file$1, 11, 0, 284);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, label0);
    			append_dev(label0, t0);
    			append_dev(label0, input0);
    			set_input_value(input0, /*name*/ ctx[0]);
    			append_dev(form, t1);
    			append_dev(form, label1);
    			append_dev(label1, t2);
    			append_dev(label1, input1);
    			set_input_value(input1, /*position*/ ctx[1]);
    			append_dev(form, t3);
    			append_dev(form, label2);
    			append_dev(label2, t4);
    			append_dev(label2, select);
    			append_dev(select, option);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*employeeType*/ ctx[3]);
    			append_dev(form, t5);
    			append_dev(form, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[6]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[7]),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[8]),
    					listen_dev(form, "submit", prevent_default(/*handleFormSubmit*/ ctx[4]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1 && input0.value !== /*name*/ ctx[0]) {
    				set_input_value(input0, /*name*/ ctx[0]);
    			}

    			if (dirty & /*position*/ 2 && input1.value !== /*position*/ ctx[1]) {
    				set_input_value(input1, /*position*/ ctx[1]);
    			}

    			if (dirty & /*$employeeTypes*/ 4) {
    				each_value = /*$employeeTypes*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*employeeType, $employeeTypes*/ 12) {
    				select_option(select, /*employeeType*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $employeeTypes;
    	validate_store(employeeTypes, 'employeeTypes');
    	component_subscribe($$self, employeeTypes, $$value => $$invalidate(2, $employeeTypes = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EmployeeForm', slots, []);
    	let { onAddEmployee } = $$props;
    	
    	let name, employeeType, position;

    	const handleFormSubmit = () => {
    		if (name && employeeType && position) onAddEmployee({
    			name,
    			employeeType,
    			position,
    			vacations: []
    		});
    	};

    	const writable_props = ['onAddEmployee'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EmployeeForm> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate(0, name);
    	}

    	function input1_input_handler() {
    		position = this.value;
    		$$invalidate(1, position);
    	}

    	function select_change_handler() {
    		employeeType = select_value(this);
    		$$invalidate(3, employeeType);
    	}

    	$$self.$$set = $$props => {
    		if ('onAddEmployee' in $$props) $$invalidate(5, onAddEmployee = $$props.onAddEmployee);
    	};

    	$$self.$capture_state = () => ({
    		onAddEmployee,
    		employeeTypes,
    		name,
    		employeeType,
    		position,
    		handleFormSubmit,
    		$employeeTypes
    	});

    	$$self.$inject_state = $$props => {
    		if ('onAddEmployee' in $$props) $$invalidate(5, onAddEmployee = $$props.onAddEmployee);
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('employeeType' in $$props) $$invalidate(3, employeeType = $$props.employeeType);
    		if ('position' in $$props) $$invalidate(1, position = $$props.position);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		position,
    		$employeeTypes,
    		employeeType,
    		handleFormSubmit,
    		onAddEmployee,
    		input0_input_handler,
    		input1_input_handler,
    		select_change_handler
    	];
    }

    class EmployeeForm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { onAddEmployee: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EmployeeForm",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*onAddEmployee*/ ctx[5] === undefined && !('onAddEmployee' in props)) {
    			console.warn("<EmployeeForm> was created without expected prop 'onAddEmployee'");
    		}
    	}

    	get onAddEmployee() {
    		throw new Error("<EmployeeForm>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onAddEmployee(value) {
    		throw new Error("<EmployeeForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.41.0 */
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (27:8) {#if isEmployeeFormShown}
    function create_if_block_1(ctx) {
    	let employeeform;
    	let current;

    	employeeform = new EmployeeForm({
    			props: { onAddEmployee: /*func*/ ctx[7] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(employeeform.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(employeeform, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const employeeform_changes = {};
    			if (dirty & /*isEmployeeFormShown, employeeTypeFilter*/ 5) employeeform_changes.onAddEmployee = /*func*/ ctx[7];
    			employeeform.$set(employeeform_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(employeeform.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(employeeform.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(employeeform, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(27:8) {#if isEmployeeFormShown}",
    		ctx
    	});

    	return block;
    }

    // (38:8) {#each $employeeTypes as filter}
    function create_each_block_1(ctx) {
    	let button;
    	let t0_value = /*filter*/ ctx[13] + "";
    	let t0;
    	let t1;
    	let button_style_value;
    	let mounted;
    	let dispose;

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[8](/*filter*/ ctx[13]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(button, "class", "Main-Filter svelte-7d23hg");

    			attr_dev(button, "style", button_style_value = /*filter*/ ctx[13] === /*employeeTypeFilter*/ ctx[0]
    			? 'border: 1px solid #15bd2e;'
    			: '');

    			add_location(button, file, 38, 12, 1309);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t0);
    			append_dev(button, t1);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler_1, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$employeeTypes*/ 16 && t0_value !== (t0_value = /*filter*/ ctx[13] + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*$employeeTypes, employeeTypeFilter*/ 17 && button_style_value !== (button_style_value = /*filter*/ ctx[13] === /*employeeTypeFilter*/ ctx[0]
    			? 'border: 1px solid #15bd2e;'
    			: '')) {
    				attr_dev(button, "style", button_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(38:8) {#each $employeeTypes as filter}",
    		ctx
    	});

    	return block;
    }

    // (48:4) {#if filteredEmployeeList.length || employeeNameFilter}
    function create_if_block(ctx) {
    	let div;
    	let label;
    	let t;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			label = element("label");
    			t = text("Знайти працівника: ");
    			input = element("input");
    			attr_dev(input, "type", "text");
    			add_location(input, file, 49, 38, 1704);
    			add_location(label, file, 49, 12, 1678);
    			add_location(div, file, 48, 8, 1660);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, label);
    			append_dev(label, t);
    			append_dev(label, input);
    			set_input_value(input, /*employeeNameFilter*/ ctx[1]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[9]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*employeeNameFilter*/ 2 && input.value !== /*employeeNameFilter*/ ctx[1]) {
    				set_input_value(input, /*employeeNameFilter*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(48:4) {#if filteredEmployeeList.length || employeeNameFilter}",
    		ctx
    	});

    	return block;
    }

    // (53:4) {#each filteredEmployeeList as employee (employee.name)}
    function create_each_block(key_1, ctx) {
    	let first;
    	let employee;
    	let current;

    	employee = new Employee({
    			props: { employee: /*employee*/ ctx[10] },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(employee.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(employee, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const employee_changes = {};
    			if (dirty & /*filteredEmployeeList*/ 8) employee_changes.employee = /*employee*/ ctx[10];
    			employee.$set(employee_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(employee.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(employee.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(employee, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(53:4) {#each filteredEmployeeList as employee (employee.name)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let div0;
    	let button;
    	let t3;
    	let t4;
    	let div1;
    	let t5;
    	let t6;
    	let each_blocks = [];
    	let each1_lookup = new Map();
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*isEmployeeFormShown*/ ctx[2] && create_if_block_1(ctx);
    	let each_value_1 = /*$employeeTypes*/ ctx[4];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let if_block1 = (/*filteredEmployeeList*/ ctx[3].length || /*employeeNameFilter*/ ctx[1]) && create_if_block(ctx);
    	let each_value = /*filteredEmployeeList*/ ctx[3];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*employee*/ ctx[10].name;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Vacapay alfa";
    			t1 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Додати працівника";
    			t3 = space();
    			if (if_block0) if_block0.c();
    			t4 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t5 = space();
    			if (if_block1) if_block1.c();
    			t6 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "Main-Header svelte-7d23hg");
    			add_location(h1, file, 18, 4, 660);
    			set_style(button, "background", "CadetBlue");
    			add_location(button, file, 20, 8, 720);
    			add_location(div0, file, 19, 4, 706);
    			attr_dev(div1, "class", "Main-Filters svelte-7d23hg");
    			add_location(div1, file, 36, 4, 1229);
    			attr_dev(main, "class", "Main svelte-7d23hg");
    			add_location(main, file, 17, 0, 636);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			append_dev(main, div0);
    			append_dev(div0, button);
    			append_dev(div0, t3);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(main, t4);
    			append_dev(main, div1);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div1, null);
    			}

    			append_dev(main, t5);
    			if (if_block1) if_block1.m(main, null);
    			append_dev(main, t6);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*isEmployeeFormShown*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*isEmployeeFormShown*/ 4) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div0, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*$employeeTypes, employeeTypeFilter*/ 17) {
    				each_value_1 = /*$employeeTypes*/ ctx[4];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (/*filteredEmployeeList*/ ctx[3].length || /*employeeNameFilter*/ ctx[1]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(main, t6);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*filteredEmployeeList*/ 8) {
    				each_value = /*filteredEmployeeList*/ ctx[3];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each1_lookup, main, outro_and_destroy_block, create_each_block, null, get_each_context);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block0) if_block0.d();
    			destroy_each(each_blocks_1, detaching);
    			if (if_block1) if_block1.d();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let filteredEmployeeList;
    	let $employeeList;
    	let $employeeTypes;
    	validate_store(employeeList, 'employeeList');
    	component_subscribe($$self, employeeList, $$value => $$invalidate(5, $employeeList = $$value));
    	validate_store(employeeTypes, 'employeeTypes');
    	component_subscribe($$self, employeeTypes, $$value => $$invalidate(4, $employeeTypes = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let employeeTypeFilter = '';
    	let employeeNameFilter = '';
    	let isEmployeeFormShown = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(2, isEmployeeFormShown = true);

    	const func = newEmployee => {
    		employeeList.addEmployee(newEmployee);
    		$$invalidate(2, isEmployeeFormShown = false);
    		$$invalidate(0, employeeTypeFilter = newEmployee.employeeType);
    	};

    	const click_handler_1 = filter => $$invalidate(0, employeeTypeFilter = filter);

    	function input_input_handler() {
    		employeeNameFilter = this.value;
    		$$invalidate(1, employeeNameFilter);
    	}

    	$$self.$capture_state = () => ({
    		Employee,
    		EmployeeForm,
    		employeeList,
    		employeeTypes,
    		employeeTypeFilter,
    		employeeNameFilter,
    		isEmployeeFormShown,
    		filteredEmployeeList,
    		$employeeList,
    		$employeeTypes
    	});

    	$$self.$inject_state = $$props => {
    		if ('employeeTypeFilter' in $$props) $$invalidate(0, employeeTypeFilter = $$props.employeeTypeFilter);
    		if ('employeeNameFilter' in $$props) $$invalidate(1, employeeNameFilter = $$props.employeeNameFilter);
    		if ('isEmployeeFormShown' in $$props) $$invalidate(2, isEmployeeFormShown = $$props.isEmployeeFormShown);
    		if ('filteredEmployeeList' in $$props) $$invalidate(3, filteredEmployeeList = $$props.filteredEmployeeList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$employeeList, employeeNameFilter, employeeTypeFilter*/ 35) {
    			$$invalidate(3, filteredEmployeeList = $employeeList.filter(value => {
    				if (employeeNameFilter) {
    					return value.employeeType === employeeTypeFilter && value.name.toLocaleLowerCase().includes(employeeNameFilter.toLocaleLowerCase());
    				}

    				return value.employeeType === employeeTypeFilter;
    			}).sort((a, b) => a.name.localeCompare(b.name, 'ua')));
    		}
    	};

    	return [
    		employeeTypeFilter,
    		employeeNameFilter,
    		isEmployeeFormShown,
    		filteredEmployeeList,
    		$employeeTypes,
    		$employeeList,
    		click_handler,
    		func,
    		click_handler_1,
    		input_input_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map