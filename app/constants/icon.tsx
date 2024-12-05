import { Feather } from "@expo/vector-icons";

export const icon = {
    index: (props: any) => (
      <Feather name="home" size={24} color="#222" {...props} />
    ),
    shop: (props: any) => (
      <Feather name="shopping-bag" size={24} color="#222" {...props}/>
    ),
    orders: (props: any) => (
      <Feather name="calendar" size={24} color="#222" {...props}/>
    ),
    profile: (props: any) => (
      <Feather name="user" size={24} color="#222" {...props}/>
    )
  };
  