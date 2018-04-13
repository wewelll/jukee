defmodule JukeeWeb.AuthErrorController do
  import Plug.Conn
  use JukeeWeb, :controller

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_status(:unauthorized)
    |> render(JukeeWeb.SessionView, "wrong_credentials.json")
  end
end
