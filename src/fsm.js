class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (typeof config == 'undefined')
            throw new Error('config is undefined')
        this.config = config;
        this.log = [config['initial']]
        this.currState = 0;
        this.canRedo = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.log[this.currState];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!(state in this.config['states']))
            throw new Error('impossiple state')
        this.log.push(state);
        this.currState++;
        this.canRedo = 0;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!(event in this.config.states[this.log[this.currState]].transitions))
            throw new Error('trigger doesn\'t exists in this state')
        this.log.push(this.config.states[this.log[this.currState]].transitions[event]);
        this.currState++;
        this.canRedo = 0;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.log.push(this.config['initial']);
        this.currState++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        return Object.keys(this.config.states).filter(state => event ? (event in this.config.states[state].transitions) : true);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.currState == 0)
            return false;
        this.currState--;
        this.canRedo++;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.canRedo == 0){
            return false;
        }
        this.currState++;
        this.canRedo--;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.log = [this.config['initial']];
        this.currState = 0;
        this.canRedo = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
