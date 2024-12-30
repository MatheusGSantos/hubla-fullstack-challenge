import { CreateUserDto } from "@/interfaces/User";
import { api } from "@/lib/api";

export async function postUser(createUserDto: CreateUserDto) {
  return await api
    .post("users", {
      json: createUserDto,
    })
    .json();
}
