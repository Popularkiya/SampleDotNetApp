# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /src

# Copy everything else and build (repeat copy command for every folder you want to move to container)
COPY . flowerbackend


WORKDIR /src/flowerbackend
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
EXPOSE 80
ENV ASPNETCORE_URLS=http://*:80
COPY --from=build-env /src/flowerbackend/out .
# Assuming your project name is the same as flowerbackend
ENTRYPOINT ["dotnet", "flowerbackend.dll"]