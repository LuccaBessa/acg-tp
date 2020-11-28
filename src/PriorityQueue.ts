import Item from './Item';

export default class PriorityQueue {
    private _heap: Item[];
    keys: number[];

    // Priority Queue class using Minimum Binary Heap
    constructor() {
        this._heap = [];
        this.keys = [];
    }

    getParentPosition(position: number) {
        // Get the parent node of the current node
        return Math.floor((position - 1) / 2);
    }

    getChildrenPosition(position: number) {
        // Get the children nodes of the current node
        return [2 * position + 1, 2 * position + 2];
    }

    isEmpty() {
        // Checking if the heap is empty
        return this._heap.length === 0;
    }

    push(key: number, priority: number) {
        // Adding element to the queue (equivalent to add)
        this._heap.push(new Item(key, priority));
        this.keys[key] = this._heap.length - 1;
        this._shiftUp(this.keys[key]);
    }

    pop(): number | undefined {
        // Removing the element with least priority (equivalent to extractMin)
        this._swap(0, this._heap.length - 1);
        if (this._heap.length !== 0) {
            const aux = this._heap.pop();
            if (aux?.key) {
                delete this.keys[aux?.key];
                this._shiftDown(0);
                return aux?.key;
            }

            return undefined;
        } else {
            return undefined;
        }
    }

    contains(key: number): boolean {
        // Check if a given key is present in the queue
        return key in this.keys;
    }

    update(key: number, priority: number) {
        // Update the priority of the given element (equivalent to decreaseKey)
        const currPos = this.keys[key];
        this._heap[currPos].priority = priority;
        const parentPos = this.getParentPosition(currPos);
        const currPriority = this._heap[currPos].priority;
        let parentPriority = Infinity;
        if (parentPos >= 0) {
            parentPriority = this._heap[parentPos].priority;
        }
        const [child1Pos, child2Pos] = this.getChildrenPosition(currPos);
        let [child1Priority, child2Priority] = [Infinity, Infinity];
        if (child1Pos < this._heap.length) {
            child1Priority = this._heap[child1Pos].priority;
        }
        if (child2Pos < this._heap.length) {
            child2Priority = this._heap[child2Pos].priority;
        }

        if (parentPos >= 0 && parentPriority > currPriority) {
            this._shiftUp(currPos);
        } else if (child2Pos < this._heap.length && (child1Priority < currPriority || child2Priority < currPriority)) {
            this._shiftDown(currPos);
        }
    }

    _shiftUp(position: number) {
        // Helper function to shift up a node to proper position (equivalent to bubbleUp)
        let currPos = position;
        let parentPos = this.getParentPosition(currPos);
        let currPriority = this._heap[currPos].priority;
        let parentPriority = Infinity;
        if (parentPos >= 0) {
            parentPriority = this._heap[parentPos].priority;
        }

        while (parentPos >= 0 && parentPriority > currPriority) {
            this._swap(currPos, parentPos);
            currPos = parentPos;
            parentPos = this.getParentPosition(currPos);
            currPriority = this._heap[currPos].priority;
            try {
                parentPriority = this._heap[parentPos].priority;
            } catch (error) {
                parentPriority = Infinity;
            }
        }
        this.keys[this._heap[currPos].key] = currPos;
    }

    _shiftDown(position: number) {
        // Helper function to shift down a node to proper position (equivalent to bubbleDown)
        let currPos = position;
        let [child1Pos, child2Pos] = this.getChildrenPosition(currPos);
        let [child1Priority, child2Priority] = [Infinity, Infinity];
        if (child1Pos < this._heap.length) {
            child1Priority = this._heap[child1Pos].priority;
        }
        if (child2Pos < this._heap.length) {
            child2Priority = this._heap[child2Pos].priority;
        }
        let currPriority: number;
        try {
            currPriority = this._heap[currPos].priority;
        } catch {
            return;
        }

        while (child2Pos < this._heap.length && (child1Priority < currPriority || child2Priority < currPriority)) {
            if (child1Priority < currPriority && child1Priority < child2Priority) {
                this._swap(child1Pos, currPos);
                currPos = child1Pos;
            } else {
                this._swap(child2Pos, currPos);
                currPos = child2Pos;
            }
            [child1Pos, child2Pos] = this.getChildrenPosition(currPos);
            try {
                [child1Priority, child2Priority] = [this._heap[child1Pos].priority, this._heap[child2Pos].priority];
            } catch (error) {
                [child1Priority, child2Priority] = [Infinity, Infinity];
            }

            currPriority = this._heap[currPos].priority;
        }
        this.keys[this._heap[currPos].key] = currPos;
        if (child1Pos < this._heap.length && child1Priority < currPriority) {
            this._swap(child1Pos, currPos);
            this.keys[this._heap[child1Pos].key] = child1Pos;
        }
    }

    _swap(position1: number, position2: number) {
        // Helper function to swap 2 nodes
        [this._heap[position1], this._heap[position2]] = [this._heap[position2], this._heap[position1]];
        this.keys[this._heap[position1].key] = position1;
        this.keys[this._heap[position2].key] = position2;
    }
}
