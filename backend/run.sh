yarn
rm -R ./dist
yarn webpack &

while ! [ -f "./dist/server.js" ];
do
    echo "#"
    sleep 1
done

chmod -R 777 ./dist
yarn start:hmr 

