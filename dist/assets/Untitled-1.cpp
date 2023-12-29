#include <iostream>
using namespace std;

class triangle{
    public:
    int base, height;

    triangle(int b, int h) : base(b), height(h) {}

    int area(){
        return (base*height)0.5;
    }

    

};

int main(){
    triangle t(6,8);
    cout << "Area : " << t.area();
    return 0;
}