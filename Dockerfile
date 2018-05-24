FROM bitwalker/alpine-elixir-phoenix:latest

RUN npm install -g yarn

# Set exposed ports
EXPOSE 5000
ENV PORT=5000 MIX_ENV=prod

# Cache elixir deps
ADD mix.exs mix.lock ./
RUN mix do deps.get, deps.compile

# Same with npm deps
ADD assets/package.json assets/
RUN cd assets && \
    yarn install


ADD . .

# Run frontend build, compile, and digest assets
RUN cd assets/ && \
    ./node_modules/.bin/webpack --config webpack.production.config.js --progress --profile --colors && \
    cd - && \
    mix do compile, phx.digest

USER default

CMD ["mix", "phx.server"]
