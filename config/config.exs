# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :jukee,
  ecto_repos: [Jukee.Repo]

# Configures the endpoint
config :jukee, JukeeWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "H5AcfaG9fEz2gjjKEBJ3PNT7peIPEo270GOHwgataQEsfdx8Ujsi3aDlxel77eQH",
  render_errors: [view: JukeeWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Jukee.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures Guardian
config :jukee, JukeeWeb.Guardian,
  issuer: "jukee",
  ttl: {30, :days},
  verify_issuer: true
  # serializer: Jukee.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
