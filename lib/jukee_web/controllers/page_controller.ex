defmodule JukeeWeb.PageController do
  use JukeeWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
