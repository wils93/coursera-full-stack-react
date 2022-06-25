$course = $args[0]

if (-Not $course) {
    Write-Host "No course has been chosen! Please choose from 1,2,3"
    Exit 1
}

if ($course -eq 1) {
    $env:PRJ_PATH = ($pwd).path + "/01. Front-End Web UI Frameworks and Tools Bootstrap 4/01. Weeks/Bootstrap4/conFusion"
}

Write-Host Running in $env:PRJ_PATH

docker-compose up -d
docker exec -it mern-stack bash