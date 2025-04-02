---
title: "State and Lifecycle"
order: 3
---

# Chapter 3: State and Lifecycle

## Understanding State

State is a way for React components to maintain and manage their own data. Unlike props, state can be changed by the component itself.

## useState Hook

The most common way to manage state in function components:

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## Component Lifecycle

### Using useEffect

The Effect Hook lets you perform side effects in function components:

```jsx
import { useState, useEffect } from 'react';

function UserStatus() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Subscribe to user status
    const unsubscribe = subscribeToUserStatus(props.user.id, setIsOnline);
    
    // Cleanup function
    return () => unsubscribe();
  }, [props.user.id]);

  return <div>User is: {isOnline ? 'Online' : 'Offline'}</div>;
}
```

## State Management Best Practices

1. Keep state minimal
2. Lift state up when needed
3. Use derived state
4. Avoid redundant state

## Common Use Cases

- Form handling
- Data fetching
- Subscriptions
- Animations

## Advanced Topics

- State batching
- State immutability
- Custom hooks
- Context API