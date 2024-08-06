https://reacttraining.com/blog/react-owner-components

## czym jest owner w React 

owner i parent to dwa odmienne pojęcia 

parent - jest rodzicem w rozumieniu struktury jsx natomiast nie może przekazywać props bo nie zarządza życiem komponentu 

owner - zaradzą generowanym jsx, może wstrzyknąć do komponentu propsy, zarządzać jego cyklem życia 

```js
// owner
function UserProfile() {
  const [user, setUser] = useState({})
  // poniżej 👇 parent
  return (
    <ProfileLayout>
      <Avatar />
    </ProfileLayout>
  )
}
```