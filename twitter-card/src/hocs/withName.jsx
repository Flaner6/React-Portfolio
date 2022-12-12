import { useEffect, useState } from 'react';

const useName = (id) => {
  const [ name, setName ] = useState(null);

  useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(json => {
        setName(json.name)
      });

  },[id]);

  return name;
}

export function withName (WrappedComponent) {
  return ((props) => {
    const name = useName(props.id)

    return (
      <WrappedComponent {...props} name={name} />
    );
  });
}