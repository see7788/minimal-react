import { useState, useEffect } from "react"
import { useCookie } from "react-use"
import { trpc } from '../trpc';
import {Space} from "antd"
const Xy = () => {
  const [xy, setxy] = useState([0, 0])
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("你的浏览器不支持地理位置");
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setxy([latitude, longitude])
          console.log(`纬度：${latitude} °，经度：${longitude} °`)
        },
        e => console.log("无法获取你的位置", e)
      );
    }
  }, [])
  return <>`纬度：${xy[0]} °，经度：${xy[1]} °`</>
}
export function Greeting() {
  const [value, updateCookie, deleteCookie] = useCookie("id_user");
  const { data, error, status } = trpc.login.user.useQuery(88888);
  const setname = trpc.user.mutation.useMutation({
    onSuccess(data, variables, context) {

    },
    onError(error, variables, context) {

    },
    onMutate(variables) {
    },
    onSettled(data, error, variables, context) { },
  });
  return (
    <Space>
      <Xy />
      <button onClick={() => updateCookie(value + "1")}>loc:{value}-query:{data}</button>
      <button onClick={() => setname.mutate("88888")}>setname.data={setname.data}</button >
    </Space>);
}